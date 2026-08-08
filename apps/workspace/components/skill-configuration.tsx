"use client";

import type { WhatsAppAsset } from "@duka/api-client";
import { StatusBadge } from "@duka/ui";
import { AlertTriangle, CheckCircle2, RefreshCw, Save, ShieldCheck, XCircle } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { SkillSchemaForm } from "./skill-schema-form";
import type { WorkspaceChannelsView } from "@/lib/channels/contracts";
import type { BffFailure, SkillDetailView, SkillValidationView, WhatsAppAssetsView } from "@/lib/skills/contracts";
import { bindingLabel, bindingTone, humanize, riskTone } from "@/lib/skills/display";

type Config = Record<string, unknown>;

async function failureMessage(response: Response): Promise<string> {
  const body = await response.json().catch(() => null) as BffFailure | null;
  return body?.error?.detail || body?.error?.message || `Request failed with status ${response.status}.`;
}

export function SkillConfiguration({ canManage, csrfToken, skillId, workspaceSlug }: {
  canManage: boolean;
  csrfToken: string;
  skillId: string;
  workspaceSlug: string;
}) {
  const [detail, setDetail] = useState<SkillDetailView | null>(null);
  const [channels, setChannels] = useState<WorkspaceChannelsView | null>(null);
  const [config, setConfig] = useState<Config>({});
  const [assets, setAssets] = useState<Record<string, WhatsAppAsset[]>>({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [validation, setValidation] = useState<SkillValidationView | null>(null);

  const basePath = `/api/bff/workspaces/${encodeURIComponent(workspaceSlug)}/skills/${encodeURIComponent(skillId)}`;
  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const [skillResponse, channelResponse] = await Promise.all([
        fetch(basePath, { cache: "no-store" }),
        fetch(`/api/bff/workspaces/${encodeURIComponent(workspaceSlug)}/channels`, { cache: "no-store" }),
      ]);
      if (!skillResponse.ok) throw new Error(await failureMessage(skillResponse));
      const skillBody = await skillResponse.json() as SkillDetailView;
      setDetail(skillBody);
      const startingConfig = skillBody.skill.config_version ? skillBody.skill.draft_config : skillBody.skill.published_config;
      setConfig(structuredClone(startingConfig));
      if (channelResponse.ok) setChannels(await channelResponse.json());
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Skill configuration could not be loaded.");
    } finally { setLoading(false); }
  }, [basePath, workspaceSlug]);

  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    const guard = (event: BeforeUnloadEvent) => { if (dirty) event.preventDefault(); };
    window.addEventListener("beforeunload", guard);
    return () => window.removeEventListener("beforeunload", guard);
  }, [dirty]);

  const activeChannels = useMemo(() => (channels?.channels ?? []).filter((channel) => channel.status === "active" && channel.transport === "whatsapp_cloud_api"), [channels]);
  const schemaHasFields = Boolean(detail && Object.keys(detail.skill.config_schema.properties ?? {}).length);

  async function loadAssets(channelId: string): Promise<WhatsAppAsset[]> {
    if (assets[channelId]) return assets[channelId];
    const response = await fetch(`/api/bff/workspaces/${encodeURIComponent(workspaceSlug)}/channels/${encodeURIComponent(channelId)}/whatsapp-assets`, { cache: "no-store" });
    if (!response.ok) throw new Error(await failureMessage(response));
    const body = await response.json() as WhatsAppAssetsView;
    setAssets((current) => ({ ...current, [channelId]: body.assets }));
    return body.assets;
  }

  async function mutate<T>(operation: string, method: "POST" | "PUT", body?: unknown): Promise<T> {
    setBusy(operation); setError(null); setNotice(null);
    const response = await fetch(`${basePath}/${operation}`, {
      method,
      headers: { "x-duka-csrf": csrfToken, ...(body === undefined ? {} : { "Content-Type": "application/json" }) },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (!response.ok) throw new Error(await failureMessage(response));
    return response.json() as Promise<T>;
  }

  async function saveDraft(): Promise<SkillDetailView> {
    try {
      const currentVersion = detail?.skill.config_version;
      const body = await mutate<SkillDetailView>("draft", "PUT", { config, ...(currentVersion ? { expected_version: currentVersion } : {}) });
      setDetail(body); setConfig(structuredClone(body.skill.draft_config)); setDirty(false); setValidation(null); setNotice("Draft saved.");
      return body;
    } finally {
      setBusy(null);
    }
  }

  async function validate() {
    try {
      const body = await mutate<SkillValidationView>("validate", "POST");
      setValidation(body);
      setNotice(body.valid ? "Configuration is valid and ready to publish." : null);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Validation failed."); }
    finally { setBusy(null); }
  }

  async function publish(version?: number) {
    const expectedVersion = version ?? detail?.skill.config_version;
    if (!expectedVersion) { setError("Save a draft before publishing."); return; }
    try {
      const body = await mutate<SkillDetailView>("publish", "POST", { expected_version: expectedVersion });
      setDetail(body); setConfig(structuredClone(body.skill.draft_config)); setValidation(null); setDirty(false); setNotice("Skill published and available to the workspace runtime.");
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Publish failed."); }
    finally { setBusy(null); }
  }

  async function enableSimpleSkill() {
    try {
      const saved = await saveDraft();
      const checked = await mutate<SkillValidationView>("validate", "POST");
      setValidation(checked);
      if (!checked.valid) { setError(checked.errors.join(" ")); return; }
      await publish(saved.skill.config_version ?? undefined);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "The skill could not be enabled."); }
    finally { setBusy(null); }
  }

  async function disable() {
    if (!window.confirm("Disable this skill? New requests will stop using it immediately.")) return;
    try {
      const body = await mutate<SkillDetailView>("disable", "POST");
      setDetail(body); setNotice("Skill disabled.");
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Disable failed."); }
    finally { setBusy(null); }
  }

  if (loading) return <div className="loading-state"><RefreshCw className="spin" size={18} />Loading skill policy...</div>;
  if (error && !detail) return <div className="error-state"><AlertTriangle size={20} /><div><strong>Skill unavailable</strong><p>{error}</p><button className="duka-button duka-button--secondary" onClick={load}>Retry</button></div></div>;
  if (!detail) return null;
  const { skill } = detail;

  return (
    <div className="skill-config-layout">
      <section className="skill-config-main">
        <div className="skill-policy-strip">
          <div><span>Status</span><StatusBadge tone={bindingTone(skill.binding_status)}>{bindingLabel(skill.binding_status)}</StatusBadge></div>
          <div><span>Use</span><strong>{humanize(skill.interaction_profile)}</strong></div>
          <div><span>Risk</span><StatusBadge tone={riskTone(skill.risk_level)}>{humanize(skill.risk_level)}</StatusBadge></div>
          <div><span>Channels</span><strong>{skill.supported_channels.map(humanize).join(", ")}</strong></div>
        </div>
        {error && <div className="inline-error"><AlertTriangle size={17} /><span>{error}</span></div>}
        {notice && <div className="inline-success"><CheckCircle2 size={17} /><span>{notice}</span></div>}
        {(validation?.errors.length || skill.validation_errors.length) > 0 && <div className="validation-summary"><strong>Configuration needs attention</strong><ul>{(validation?.errors ?? skill.validation_errors).map((item) => <li key={item}>{item}</li>)}</ul></div>}
        <div className="skill-config-heading"><div><h2>Workspace configuration</h2><p>These settings contain references and business rules only. Provider credentials remain server-side.</p></div>{dirty && <span>Unsaved changes</span>}</div>
        <SkillSchemaForm channels={activeChannels} disabled={!canManage || busy !== null} loadAssets={loadAssets} onChange={(next) => { setConfig(next); setDirty(true); setValidation(null); setNotice(null); }} schema={skill.config_schema} value={config} />
        <div className="skill-config-actions">
          {canManage && !schemaHasFields && skill.binding_status !== "active" && <button className="duka-button duka-button--primary" disabled={busy !== null} onClick={() => void enableSimpleSkill()} type="button"><ShieldCheck size={17} />{busy ? "Enabling..." : "Enable skill"}</button>}
          {canManage && schemaHasFields && <><button className="duka-button duka-button--secondary" disabled={busy !== null || !dirty} onClick={() => void saveDraft().catch((reason) => { setError(reason instanceof Error ? reason.message : "Save failed."); setBusy(null); })} type="button"><Save size={17} />Save draft</button><button className="duka-button duka-button--secondary" disabled={busy !== null || dirty || !skill.config_version} onClick={() => void validate()} type="button"><CheckCircle2 size={17} />Validate</button><button className="duka-button duka-button--primary" disabled={busy !== null || dirty || !validation?.valid} onClick={() => void publish()} type="button"><ShieldCheck size={17} />Publish</button></>}
          {canManage && skill.binding_status === "active" && <button className="duka-button duka-button--quiet skill-disable" disabled={busy !== null} onClick={() => void disable()} type="button"><XCircle size={17} />Disable</button>}
        </div>
      </section>
      <aside className="skill-config-aside">
        <h2>Runtime policy</h2>
        <dl><div><dt>Allowed roles</dt><dd>{skill.allowed_roles.map(humanize).join(", ")}</dd></div><div><dt>Permission</dt><dd>{humanize(skill.required_permission_set)}</dd></div>{skill.workflow_id && <div><dt>Workflow</dt><dd>{skill.workflow_id} v{skill.workflow_version}</dd></div>}<div><dt>Version</dt><dd>{skill.config_version ?? "Not published"}</dd></div></dl>
        {!canManage && <p className="permission-message">You can inspect this policy, but a workspace administrator must change it.</p>}
      </aside>
    </div>
  );
}
