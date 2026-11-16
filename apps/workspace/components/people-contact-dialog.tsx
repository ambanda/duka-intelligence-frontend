"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Save, X } from "lucide-react";
import { field, labels, useOperations, type OperationRow as Row } from "./operations-client";

const tagKey = (label: string) => label.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");

export function PeopleContactDialog({ workspaceSlug, csrfToken, person, channels, categories, onClose, onSaved }: {
  workspaceSlug: string; csrfToken: string; person: Row | null; channels: Row[]; categories: string[];
  onClose: () => void; onSaved: (person: Row) => void;
}) {
  const api = useOperations(workspaceSlug, csrfToken);
  const dialog = useRef<HTMLDialogElement>(null);
  const errorElement = useRef<HTMLParagraphElement>(null);
  const idempotency = useRef(crypto.randomUUID());
  const active = channels.filter((c) => c.status === "active" && c.transport_type === "meta_cloud_api");
  const [identity, setIdentity] = useState(!person && active.length > 0);
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { dialog.current?.showModal(); }, []);
  useEffect(() => { if (error) errorElement.current?.focus(); }, [error]);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const form = new FormData(event.currentTarget);
    const text = (key: string) => String(form.get(key) || "").trim();
    try {
      const relationships = form.getAll("relationships").map(String);
      if (person && labels(person.relationships).includes("staff")) relationships.push("staff");
      const categories = [...new Set([...form.getAll("categories").map(String), ...text("new_tags").split(",").map(tagKey).filter(Boolean)])];
      if (categories.some((key) => !/^[a-z][a-z0-9_]{0,79}$/.test(key))) throw new Error("Tags must start with a letter and contain at most 80 characters.");
      const marketingConsent = identity && consent ? {
        confirmed: true, source: text("source"), purposes: text("purposes").split(",").map((v) => v.trim()).filter(Boolean),
        evidence_reference: text("evidence"), policy_version: text("policy"),
        consented_at: new Date(text("consented_at")).toISOString(),
        consent_expires_at: text("expires_at") ? new Date(text("expires_at")).toISOString() : null,
      } : null;
      const saved = await api(person ? `people/${field(person, "contact_id")}` : "people", person ? "PUT" : "POST", {
        idempotency_key: person ? field(person, "contact_id") : idempotency.current,
        display_name: text("name"), preferred_name: text("preferred") || null, email: text("email") || null,
        relationships, categories, do_not_contact: form.get("suppressed") === "on",
        expected_version: person?.membership_version || 0, profile_version: person?.version || null,
        identity: identity ? { channel_id: text("channel"), phone_number_e164: text("phone"), marketing_consent: marketingConsent } : null,
      });
      onSaved(saved);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Contact could not be saved."); }
    finally { setBusy(false); }
  }

  return <dialog className="contact-dialog" ref={dialog} onCancel={onClose} aria-labelledby="person-dialog-title">
    <form className="whatsapp-form" onSubmit={save}>
      <div className="section-heading"><h2 id="person-dialog-title">{person ? "Edit contact" : "Add contact"}</h2><button type="button" className="icon-button" title="Close" aria-label="Close contact form" onClick={onClose}><X size={18} /></button></div>
      {error && <p className="error-state" role="alert" tabIndex={-1} ref={errorElement}>{error}</p>}
      <label>Name<input name="name" defaultValue={person ? field(person, "display_name") : ""} required maxLength={200} autoComplete="name" /></label>
      <label>Preferred name<input name="preferred" defaultValue={person ? field(person, "preferred_name") : ""} maxLength={120} /></label>
      <label>Email<input name="email" type="email" defaultValue={person ? field(person, "email") : ""} autoComplete="email" /></label>
      <fieldset><legend>Relationships</legend>{["prospect", "customer", "member"].map((r) => <label key={r}><input type="checkbox" name="relationships" value={r} defaultChecked={person ? labels(person.relationships).includes(r) : r === "prospect"} />{r[0].toUpperCase() + r.slice(1)}</label>)}</fieldset>
      <fieldset><legend>Tags</legend>{categories.map((key) => <label key={key}><input type="checkbox" name="categories" value={key} defaultChecked={person ? labels(person.categories).includes(key) : false} />{key.replaceAll("_", " ")}</label>)}<label>New tags<input name="new_tags" maxLength={500} placeholder="Consulting interested, conference" /></label></fieldset>
      <label><input type="checkbox" checked={identity} onChange={(e) => setIdentity(e.target.checked)} disabled={!active.length} />Add WhatsApp phone number</label>
      {identity && <fieldset><legend>Channel identity</legend><label>Channel<select name="channel" required>{active.map((c) => <option key={field(c, "channel_id")} value={field(c, "channel_id")}>{field(c, "display_name")} {field(c, "bot_phone_number")}</option>)}</select></label>
        <label>Phone number<input name="phone" type="tel" required pattern="\+[1-9][0-9]{7,14}" placeholder="+254725375358" autoComplete="tel" /></label>
        <label><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />I hold evidence of marketing permission</label>
        {consent && <><label>Consent source<select name="source"><option value="offline_form">Offline form</option><option value="website_form">Website form</option><option value="recorded_conversation">Recorded conversation</option></select></label><label>Purposes<input name="purposes" required defaultValue="all_marketing" /></label><label>Evidence reference<input name="evidence" required /></label><label>Consent wording / policy version<input name="policy" required /></label><label>Consented at<input name="consented_at" type="datetime-local" required /></label><label>Expires at<input name="expires_at" type="datetime-local" /></label></>}
      </fieldset>}
      <label><input name="suppressed" type="checkbox" defaultChecked={Boolean(person?.do_not_contact)} />Do not contact</label>
      <div className="whatsapp-form-actions"><button className="duka-button duka-button--primary" disabled={busy}><Save size={16} />Save contact</button><button className="duka-button duka-button--quiet" type="button" onClick={onClose}>Cancel</button></div>
    </form>
  </dialog>;
}
