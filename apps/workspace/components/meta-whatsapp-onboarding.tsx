"use client";

import type { CreateOnboardingSessionResponse } from "@duka/api-client";
import { StatusBadge } from "@duka/ui";
import { AlertTriangle, Check, ExternalLink, LoaderCircle, LockKeyhole } from "lucide-react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

import { channelStatusLabel, channelStatusTone } from "@/lib/channels/status";
import type { OnboardingView } from "@/lib/channels/contracts";

interface MetaAssets {
  wabaId: string;
  phoneNumberId?: string;
  businessId?: string;
  completionType: "phone_complete" | "waba_only";
  eventName: string;
}

interface FacebookLoginResponse {
  authResponse?: { code?: string };
  status?: string;
}

interface FacebookSdk {
  init(options: { appId: string; cookie: boolean; version: string; xfbml: boolean }): void;
  login(callback: (response: FacebookLoginResponse) => void, options: Record<string, unknown>): void;
}

interface PreparedSignup {
  onboarding: CreateOnboardingSessionResponse;
  facebook: FacebookSdk;
}

declare global {
  interface Window {
    FB?: FacebookSdk;
    fbAsyncInit?: () => void;
  }
}

const terminalStatuses = new Set(["active", "cancelled", "disconnected", "expired", "failed", "requires_action"]);

async function loadFacebookSdk(appId: string, version: string): Promise<FacebookSdk> {
  if (window.FB) {
    window.FB.init({ appId, cookie: true, version, xfbml: false });
    return window.FB;
  }
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error("Meta SDK did not load")), 15_000);
    window.fbAsyncInit = () => {
      window.clearTimeout(timer);
      window.FB?.init({ appId, cookie: true, version, xfbml: false });
      if (window.FB) resolve(window.FB);
      else reject(new Error("Meta SDK is unavailable"));
    };
    const existing = document.getElementById("facebook-jssdk");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.onerror = () => reject(new Error("Meta SDK could not be downloaded"));
      document.head.appendChild(script);
    }
  });
}

function waitForMetaAssets(onProgress?: (message: string) => void): { promise: Promise<MetaAssets>; cancel: (reason?: string) => void } {
  let cancel: (reason?: string) => void = () => {};
  const promise = new Promise<MetaAssets>((resolve, reject) => {
    const timer = window.setTimeout(() => finish(() => reject(new Error("Meta asset selection timed out"))), 480_000);
    function finish(action: () => void) {
      window.clearTimeout(timer);
      window.removeEventListener("message", receive);
      action();
    }
    function receive(event: MessageEvent) {
      let origin: URL;
      try { origin = new URL(event.origin); } catch { return; }
      if (origin.protocol !== "https:" || (origin.hostname !== "facebook.com" && !origin.hostname.endsWith(".facebook.com"))) return;
      let payload: unknown = event.data;
      if (typeof payload === "string") {
        try { payload = JSON.parse(payload); } catch { return; }
      }
      if (!payload || typeof payload !== "object") return;
      const message = payload as { type?: string; event?: string; data?: Record<string, string>; error_message?: string };
      if (message.type !== "WA_EMBEDDED_SIGNUP") return;
      console.info("[Meta Embedded Signup]", {
        event: message.event ?? "UNKNOWN",
        hasWabaId: Boolean(message.data?.waba_id),
        hasPhoneNumberId: Boolean(message.data?.phone_number_id),
      });
      if (message.event === "CANCEL") {
        const step = message.data?.current_step;
        finish(() => reject(new Error(step ? `Meta signup was cancelled at ${step}` : "Meta signup was cancelled")));
        return;
      }
      if (message.event === "ERROR") {
        finish(() => reject(new Error(message.data?.error_message || message.error_message || "Meta could not complete asset selection")));
        return;
      }
      if (message.event !== "FINISH" && message.event !== "FINISH_ONLY_WABA") return;
      const wabaId = message.data?.waba_id;
      const phoneNumberId = message.data?.phone_number_id;
      if (!wabaId) {
        finish(() => reject(new Error("Meta did not return the selected Messaging account ID.")));
        return;
      }
      if (message.event === "FINISH" && !phoneNumberId) {
        finish(() => reject(new Error("Meta did not return the selected business phone number ID.")));
        return;
      }
      const completionType = message.event === "FINISH_ONLY_WABA"
        ? "waba_only"
        : "phone_complete";
      onProgress?.(
        phoneNumberId
          ? "WhatsApp assets selected. Securing the authorization with Duka."
          : "WhatsApp account authorized. Duka will track the remaining phone setup.",
      );
      finish(() => resolve({
        wabaId,
        phoneNumberId,
        businessId: message.data?.business_id ?? message.data?.businessId,
        completionType,
        eventName: message.event ?? "FINISH",
      }));
    }
    cancel = (reason = "Meta signup cancelled") => finish(() => reject(new Error(reason)));
    window.addEventListener("message", receive);
  });
  return { promise, cancel };
}

function requestHeaders(csrfToken: string): HeadersInit {
  return { "Content-Type": "application/json", "x-duka-csrf": csrfToken };
}

export function MetaWhatsAppOnboarding({
  canManage,
  csrfToken,
  initialSessionId,
  sector,
  shopId,
  workspaceSlug,
}: {
  canManage: boolean;
  csrfToken: string;
  initialSessionId?: string;
  sector: string;
  shopId: string;
  workspaceSlug: string;
}) {
  const [status, setStatus] = useState<OnboardingView | null>(null);
  const [busy, setBusy] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const [preparedSignup, setPreparedSignup] = useState<PreparedSignup | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [metaProgress, setMetaProgress] = useState<string | null>(null);
  const [pin, setPin] = useState("");
  const preparationStarted = useRef(false);
  const sessionId = status?.session_id ?? initialSessionId;

  const pollStatus = useCallback(async (id: string) => {
    const response = await fetch(`/api/bff/channels/whatsapp/onboarding/${encodeURIComponent(id)}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Connection status is unavailable");
    const next = await response.json() as OnboardingView;
    setStatus(next);
    return next;
  }, []);

  useEffect(() => {
    if (!initialSessionId) return;
    void pollStatus(initialSessionId).catch(() => setError("The onboarding session could not be loaded."));
  }, [initialSessionId, pollStatus]);

  useEffect(() => {
    if (!sessionId || (status && terminalStatuses.has(status.status))) return;
    const timer = window.setInterval(() => void pollStatus(sessionId).catch(() => undefined), 2_500);
    return () => window.clearInterval(timer);
  }, [pollStatus, sessionId, status]);

  const prepareConnection = useCallback(async () => {
    setPreparing(true);
    setError(null);
    setMetaProgress("Preparing a secure Meta connection.");
    try {
      const insecureE2eAllowed = process.env.NEXT_PUBLIC_WORKSPACE_E2E_ALLOW_HTTP === "true";
      if (!insecureE2eAllowed && (window.location.protocol !== "https:" || !window.isSecureContext)) {
        throw new Error("Meta Embedded Signup requires a trusted HTTPS workspace page");
      }
      const createResponse = await fetch(`/api/bff/workspaces/${encodeURIComponent(workspaceSlug)}/channels/whatsapp/onboarding-sessions`, {
        method: "POST",
        headers: requestHeaders(csrfToken),
        body: JSON.stringify({ sector, shop_id: shopId }),
      });
      if (!createResponse.ok) throw new Error("Duka could not prepare WhatsApp onboarding");
      const onboarding = await createResponse.json() as CreateOnboardingSessionResponse;
      const facebook = await loadFacebookSdk(onboarding.meta_app_id, onboarding.graph_api_version);
      setPreparedSignup({ onboarding, facebook });
    } catch (reason) {
      setPreparedSignup(null);
      setError(reason instanceof Error ? reason.message : "WhatsApp onboarding preparation failed");
    } finally {
      setPreparing(false);
      setMetaProgress(null);
    }
  }, [csrfToken, sector, shopId, workspaceSlug]);

  useEffect(() => {
    if (!canManage || preparationStarted.current) return;
    preparationStarted.current = true;
    void prepareConnection();
  }, [canManage, prepareConnection]);

  async function startConnection() {
    if (!preparedSignup) {
      await prepareConnection();
      return;
    }
    setBusy(true);
    setError(null);
    setMetaProgress("Opening Meta Embedded Signup.");
    let assetWaiter: ReturnType<typeof waitForMetaAssets> | null = null;
    try {
      const { onboarding, facebook } = preparedSignup;
      setMetaProgress("Select the Business Portfolio, WhatsApp account, and phone number in Meta.");
      assetWaiter = waitForMetaAssets(setMetaProgress);
      const codePromise = new Promise<string>((resolve, reject) => {
        facebook.login(
          (response) => {
            if (response.authResponse?.code) {
              console.info("[Meta Embedded Signup]", { authorization: "received" });
              setMetaProgress("Meta authorization received. Waiting for WhatsApp asset details.");
              resolve(response.authResponse.code);
              return;
            }
            console.warn("[Meta Embedded Signup] Authorization code missing", {
              status: response.status ?? "unknown",
              hasAuthResponse: Boolean(response.authResponse),
              authResponseFields: response.authResponse ? Object.keys(response.authResponse) : [],
            });
            reject(new Error(
              response.status === "connected"
                ? "Meta returned an existing Facebook session without an Embedded Signup authorization code. Close the Meta window and try again."
                : `Meta authorization did not complete${response.status ? ` (${response.status})` : ""}`,
            ));
          },
          {
            config_id: onboarding.meta_configuration_id,
            auth_type: "rerequest",
            response_type: "code",
            override_default_response_type: true,
            extras: onboarding.embedded_signup_version === "v4"
              ? { setup: {} }
              : { sessionInfoVersion: 3, setup: {} },
          },
        );
      });
      const [assets, authorizationCode] = await Promise.all([assetWaiter.promise, codePromise]);
      const completeResponse = await fetch("/api/bff/channels/whatsapp/onboarding/complete", {
        method: "POST",
        headers: requestHeaders(csrfToken),
        body: JSON.stringify({
          session_id: onboarding.session_id,
          state: onboarding.state,
          authorization_code: authorizationCode,
          waba_id: assets.wabaId,
          phone_number_id: assets.phoneNumberId,
          meta_business_id: assets.businessId,
          completion_type: assets.completionType,
          meta_event_name: assets.eventName,
        }),
      });
      if (!completeResponse.ok) throw new Error("Duka could not secure the Meta authorization");
      setStatus(await completeResponse.json());
    } catch (reason) {
      assetWaiter?.cancel();
      setPreparedSignup(null);
      setError(reason instanceof Error ? reason.message : "WhatsApp onboarding failed");
    } finally {
      setBusy(false);
      setMetaProgress(null);
    }
  }

  async function submitPin(event: FormEvent) {
    event.preventDefault();
    if (!sessionId || !/^\d{6}$/.test(pin)) return;
    setBusy(true);
    setError(null);
    try {
      const response = await fetch(`/api/bff/channels/whatsapp/onboarding/${encodeURIComponent(sessionId)}/resume`, {
        method: "POST",
        headers: requestHeaders(csrfToken),
        body: JSON.stringify({ registration_pin: pin }),
      });
      if (!response.ok) throw new Error("The registration PIN was not accepted");
      setPin("");
      setStatus(await response.json());
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Registration could not continue");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="connect-layout">
      <div className="connect-main">
        <div className="section-heading"><div><h2>Meta Embedded Signup</h2><p>Select the Business Portfolio, WhatsApp Business Account, and phone number in Meta&apos;s secured flow.</p></div>{status ? <StatusBadge tone={channelStatusTone(status.status)}>{channelStatusLabel(status.status)}</StatusBadge> : null}</div>
        <ol className="setup-steps">
          <li><span><Check size={17} /></span><div><strong>Workspace authorization</strong><p>Duka confirms your principal and administrator role for this workspace.</p></div></li>
          <li><span>2</span><div><strong>Authorize Meta assets</strong><p>Meta returns a one-time code. Duka exchanges it immediately on the server.</p></div></li>
          <li><span>3</span><div><strong>Validate and activate</strong><p>Duka validates ownership, secures credentials, registers the phone, and waits for a signed webhook.</p></div></li>
        </ol>
        {error ? <div className="inline-error"><AlertTriangle size={17} /><span>{error}</span></div> : null}
        {status?.error_summary ? <div className="inline-error"><AlertTriangle size={17} /><span>{status.error_summary}</span></div> : null}
        {(busy || preparing) && metaProgress ? <p className="field-help" aria-live="polite">{metaProgress}</p> : null}
        {status?.required_action === "provide_registration_pin" ? (
          <form className="pin-form" onSubmit={submitPin}>
            <label htmlFor="registration-pin">Six-digit registration PIN</label>
            <div><input autoComplete="one-time-code" id="registration-pin" inputMode="numeric" maxLength={6} onChange={(event) => setPin(event.target.value.replace(/\D/g, ""))} pattern="\d{6}" required type="password" value={pin} /><button className="duka-button duka-button--primary" disabled={busy || pin.length !== 6} type="submit">Continue</button></div>
          </form>
        ) : (
          <button className="duka-button duka-button--primary" disabled={!canManage || busy || preparing || status?.status === "active"} onClick={startConnection} type="button">
            {busy || preparing ? <LoaderCircle className="spin" size={17} /> : <ExternalLink size={17} />}
            {status?.status === "active"
              ? "WhatsApp connected"
              : preparing
                ? "Preparing secure connection"
              : busy
                ? "Securing connection"
                : !preparedSignup
                  ? "Prepare Meta connection"
                : status?.required_action?.startsWith("complete_phone")
                  ? "Continue phone setup"
                  : "Continue with Meta"}
          </button>
        )}
        {!canManage ? <p className="field-help">A workspace administrator role is required to connect channels.</p> : null}
      </div>
      <aside className="security-note"><LockKeyhole size={20} /><div><strong>Credential isolation</strong><p>Authorization codes go directly to the Duka server. Access tokens are never returned to this page, browser storage, or logs.</p></div></aside>
    </section>
  );
}
