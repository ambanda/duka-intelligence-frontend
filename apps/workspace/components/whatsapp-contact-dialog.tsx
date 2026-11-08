"use client";

import type { CreateWhatsAppContactRequest, WhatsAppContactTag } from "@duka/api-client";
import { AlertTriangle, Save, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import type { WhatsAppContactView } from "@/lib/whatsapp-management/contracts";

export function WhatsAppContactDialog({ base, csrfToken, contact, onClose, onSaved }: {
  base: string;
  csrfToken: string;
  contact?: WhatsAppContactView;
  onClose: () => void;
  onSaved: (contact: WhatsAppContactView, notice: string) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  const [recordPermission, setRecordPermission] = useState(false);
  const [purpose, setPurpose] = useState("");
  const [tags, setTags] = useState<WhatsAppContactTag[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dialog.current?.showModal();
    const controller = new AbortController();
    void fetch(`${base}/contact-tags`, { signal: controller.signal, cache: "no-store" })
      .then(async (response) => { if (response.ok) setTags((await response.json() as { tags: WhatsAppContactTag[] }).tags); })
      .catch(() => undefined);
    return () => controller.abort();
  }, [base]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    const text = (key: string) => String(form.get(key) || "").trim();
    const payload: CreateWhatsAppContactRequest = {
      phone_number_e164: text("phone_number_e164"),
      tag_keys: form.getAll("tag_keys").map(String),
      ...(!contact ? {
        display_name: text("display_name") || null,
        preferred_name: text("preferred_name") || null,
        contact_type: text("contact_type") as CreateWhatsAppContactRequest["contact_type"],
      } : {}),
    };
    try {
      if (recordPermission) {
        if (!form.get("confirmed")) throw new Error("Confirm the existing permission before recording it.");
        payload.marketing_consent = {
          confirmed: true,
          purposes: [purpose === "custom" ? text("custom_purpose") : purpose],
          source: text("consent_source") as NonNullable<CreateWhatsAppContactRequest["marketing_consent"]>["source"],
          evidence_reference: text("evidence_reference"),
          policy_version: text("policy_version"),
          consented_at: new Date(text("consented_at")).toISOString(),
          consent_expires_at: text("consent_expires_at") ? new Date(text("consent_expires_at")).toISOString() : null,
        };
      }
      const response = await fetch(`${base}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-duka-csrf": csrfToken },
        body: JSON.stringify(payload),
      });
      const result = await response.json() as {
        contact: WhatsAppContactView; created: boolean; consent_outcome: string;
        error?: { detail?: string; message?: string };
      };
      if (!response.ok) throw new Error(result.error?.detail || result.error?.message || "Contact could not be saved.");
      const notice = `${result.created ? "Contact added." : "Existing contact selected; existing details preserved."} ${result.consent_outcome === "imported" ? "Marketing permission recorded." : result.consent_outcome === "unchanged" ? "This permission evidence was already recorded." : "Marketing permission unchanged."} No message was sent.`;
      onSaved(result.contact, notice);
      onClose();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Contact could not be saved.");
    } finally { setBusy(false); }
  }

  return <dialog aria-labelledby={headingId} className="contact-dialog" ref={dialog} onCancel={(event) => { event.preventDefault(); if (!busy) onClose(); }}>
    <form className="whatsapp-form" onSubmit={submit}>
      <div className="section-heading"><h2 id={headingId}>{contact ? "Record marketing permission" : "Add contact"}</h2><button aria-label="Close contact form" className="icon-button" disabled={busy} onClick={onClose} title="Close" type="button"><X size={18} /></button></div>
      {error ? <div className="inline-error" role="alert"><AlertTriangle size={16} /><span>{error}</span></div> : null}
      <label>Phone number<input autoComplete="tel" defaultValue={contact?.recipient || ""} maxLength={30} name="phone_number_e164" placeholder="+254700000000" readOnly={Boolean(contact)} required type="tel" /></label>
      {!contact ? <>
        <div className="whatsapp-form-grid"><label>Display name<input autoComplete="name" maxLength={200} name="display_name" /></label><label>Preferred name<input maxLength={120} name="preferred_name" /></label></div>
        <label>Contact type<select defaultValue="prospect" name="contact_type"><option value="prospect">Prospect</option><option value="customer">Customer</option><option value="member">Member</option><option value="unknown">Unknown</option></select></label>
      </> : null}
      {tags.length ? <fieldset className="tag-picker"><legend>Add categories</legend>{tags.map((tag) => <label key={tag.tag_id}><input name="tag_keys" type="checkbox" value={tag.tag_key} />{tag.display_name}</label>)}</fieldset> : null}
      <label className="contact-consent-toggle"><input checked={recordPermission} name="record_permission" onChange={(event) => setRecordPermission(event.target.checked)} type="checkbox" />Record existing marketing permission</label>
      {recordPermission ? <fieldset className="contact-consent-fields"><legend>Permission evidence</legend>
        <div className="whatsapp-form-grid">
          <label>Marketing purpose<select name="consent_purpose" onChange={(event) => setPurpose(event.target.value)} required value={purpose}><option value="">Select purpose</option><option value="offers">Relevant offers</option><option value="catalog_updates">Catalog updates</option><option value="all_marketing">All marketing</option><option value="custom">Other purpose</option></select></label>
          <label>Permission source<select defaultValue="" name="consent_source" required><option value="">Select source</option><option value="offline_form">Offline form</option><option value="website_form">Website form</option><option value="recorded_conversation">Recorded conversation</option><option value="other">Other evidence</option></select></label>
        </div>
        {purpose === "custom" ? <label>Purpose identifier<input maxLength={100} name="custom_purpose" pattern="[a-z][a-z0-9_]*" required /></label> : null}
        <label>Evidence reference<input maxLength={500} name="evidence_reference" placeholder="Form reference or consent record location" required /></label>
        <label>Consent wording / policy version<input maxLength={100} name="policy_version" required /></label>
        <div className="whatsapp-form-grid"><label>Permission given at<input name="consented_at" required type="datetime-local" /></label><label>Expires at (optional)<input name="consent_expires_at" type="datetime-local" /></label></div>
        <label className="contact-consent-toggle"><input name="confirmed" required type="checkbox" />I confirm this person agreed to receive these marketing messages from this business and the evidence is available.</label>
      </fieldset> : null}
      <div className="whatsapp-form-actions"><button className="duka-button duka-button--secondary" disabled={busy} onClick={onClose} type="button">Cancel</button><button className="duka-button duka-button--primary" disabled={busy} type="submit"><Save size={16} />{busy ? "Saving..." : "Save contact"}</button></div>
    </form>
  </dialog>;
}
