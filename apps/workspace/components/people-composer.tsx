"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Send, Eye, RefreshCw } from "lucide-react";
import { useOperations, field, rows, type OperationRow as Row } from "./operations-client";
import { TemplateParameterField } from "./template-parameter-field";

export function PeopleComposer({ workspaceSlug, csrfToken, selected, categories, channels, onClose }: { workspaceSlug: string; csrfToken: string; selected: string[]; categories: string[]; channels: Row[]; onClose: () => void }) {
  const api = useOperations(workspaceSlug, csrfToken);
  const [audience, setAudience] = useState("__selected__");
  const [channel, setChannel] = useState("");
  const [templates, setTemplates] = useState<Row[]>([]);
  const [templateId, setTemplateId] = useState("");
  const [mode, setMode] = useState("template");
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [mappings, setMappings] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<Row | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  useEffect(() => {
    setTemplates([]); setTemplateId(""); setValues({}); setMappings({}); setPreview(null);
    if (!channel) return;
    let active = true;
    void fetch(`/api/bff/workspaces/${encodeURIComponent(workspaceSlug)}/channels/${encodeURIComponent(channel)}/message-templates`, { cache: "no-store" }).then(async (r) => {
      const result = await r.json(); if (!r.ok) throw new Error(result.error?.message || "Templates unavailable");
      if (active) setTemplates(rows(result.templates).filter((t) => t.status === "APPROVED"));
    }).catch((e) => setError(String(e)));
    return () => { active = false; };
  }, [channel, workspaceSlug]);
  const template = templates.find((t) => t.template_record_id === templateId);
  const fields = rows((template?.send_schema as Row | undefined)?.fields);
  useEffect(() => { setDirty(true); }, [selected, audience, channel, templateId, mode]);
  async function run(operation: () => Promise<void>) { setError(""); setBusy(true); try { await operation(); } catch (e) { setError(e instanceof Error ? e.message : String(e)); } finally { setBusy(false); } }
  function createPreview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget);
    void run(async () => {
      setPreview(await api("dispatches", "POST", { idempotency_key: crypto.randomUUID(),
        contact_ids: audience === "__selected__" ? selected : [], category: audience === "__selected__" ? null : audience,
        channel_id: channel, template_record_id: mode === "template" ? templateId : null,
        message_text: mode === "service" ? form.get("message") : null,
        purpose: form.get("purpose"), business_reference: form.get("reference"), values,
        field_mappings: mappings, recipient_limit: Number(form.get("limit")),
      })); setDirty(false);
    });
  }
  return <section className="operational-section people-composer" aria-label="Compose message"><div className="knowledge-toolbar"><h2>Compose message</h2><button className="duka-button duka-button--quiet" onClick={onClose}>Close</button></div>
    {error && <p role="alert" className="error-state">{error}</p>}
    <form className="knowledge-form" onSubmit={createPreview} onChange={() => setDirty(true)}>
      <fieldset><legend>1. Contacts</legend><label>Audience<select name="audience" value={audience} onChange={(e) => { setAudience(e.target.value); setMode("template"); }}><option value="__selected__">Selected contacts ({selected.length})</option>{categories.map((c) => <option key={c} value={c}>{c}</option>)}</select></label><label>Recipient limit<input name="limit" type="number" defaultValue={50} min={1} max={100} required /></label></fieldset>
      <fieldset><legend>2. Channel</legend><label>Sender<select name="channel" required value={channel} onChange={(e) => setChannel(e.target.value)}><option value="">Select channel</option>{channels.map((c) => <option key={field(c, "channel_id")} value={field(c, "channel_id")} disabled={c.status !== "active" || c.transport_type !== "meta_cloud_api"}>{field(c, "display_name")} {field(c, "bot_phone_number")}</option>)}</select></label></fieldset>
      <fieldset disabled={!channel}><legend>3. Message</legend><label>Message type<select name="mode" value={mode} onChange={(e) => setMode(e.target.value)}><option value="template">Approved template</option><option value="service" disabled={audience !== "__selected__" || selected.length !== 1}>Service reply</option></select></label>
        {mode === "service" ? <label>Message<textarea name="message" required maxLength={4096} rows={4} /></label> : <><label>Template<select name="template" required value={templateId} onChange={(e) => { setTemplateId(e.target.value); setValues({}); setMappings({}); }}><option value="">Select template</option>{templates.map((t) => <option value={field(t, "template_record_id")} key={field(t, "template_record_id")}>{field(t, "name")} ({field(t, "category")}, {field(t, "language")})</option>)}</select></label>
          {rows(template?.components).filter((c) => c.text).map((c, i) => <blockquote className="message-preview" key={i}>{field(c, "text")}</blockquote>)}
          {fields.map((f) => <div className="parameter-field" key={field(f, "key")}><TemplateParameterField definition={f} value={values[field(f, "key")]} disabled={Boolean(mappings[field(f, "key")])} onChange={(value) => setValues({ ...values, [field(f, "key")]: value })} />{field(f, "value_type") === "text" && <label>Personalization<select name={`mapping-${field(f, "key")}`} value={mappings[field(f, "key")] || ""} onChange={(e) => setMappings((old) => { const next = { ...old }; if (e.target.value) next[field(f, "key")] = e.target.value; else delete next[field(f, "key")]; return next; })}><option value="">Fixed value</option><option value="contact.preferred_name">Contact preferred name</option><option value="contact.display_name">Contact full name</option></select></label>}</div>)}
        </>}
        <label>Purpose<input key={mode} name="purpose" required defaultValue={mode === "service" ? "service_reply" : "all_marketing"} maxLength={100} /></label><label>Business / campaign reference<input name="reference" required minLength={3} maxLength={200} /></label>
      </fieldset><button className="duka-button duka-button--secondary" disabled={busy || !channel}><Eye size={16} />Review audience</button>
    </form>
    {preview && <div><h3>Audience review: {field(preview, "status")}</h3><p className="reference-text">{field(preview, "dispatch_id")}</p><div className="knowledge-scroll"><table><thead><tr><th>Contact</th><th>Eligibility</th><th>Status</th><th>Delivery</th><th>Outreach / journey</th></tr></thead><tbody>{rows(preview.recipients).map((r) => <tr key={field(r, "contact_id")}><td><a href={`?contact=${encodeURIComponent(field(r, "contact_id"))}`}>{field(r, "display_name") || field(r, "contact_id")}</a></td><td>{field(r, "eligibility_reason")}</td><td>{field(r, "status")}</td><td>{field(r, "delivery_status") || "-"}{Boolean(r.delivery_error || r.error_summary) && <p role="status">{field(r, "delivery_error") || field(r, "error_summary")}</p>}</td><td className="reference-text">{field(r, "journey_reference")}<br />{field(r, "journey_id")}</td></tr>)}</tbody></table></div>
      <div className="knowledge-actions"><button className="duka-button duka-button--primary" disabled={busy || dirty || preview.status !== "draft" || !rows(preview.recipients).some((r) => r.status === "pending")} onClick={() => void run(async () => setPreview(await api(`dispatches/${field(preview, "dispatch_id")}/confirm`, "POST", { payload_hash: preview.payload_hash })))}><Send size={16} />Confirm eligible recipients</button><button className="icon-button" aria-label="Refresh delivery evidence" title="Refresh delivery evidence" onClick={() => void run(async () => setPreview(await api(`dispatches/${field(preview, "dispatch_id")}`)))}><RefreshCw size={18} /></button></div>
    </div>}
  </section>;
}
