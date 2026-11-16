"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Send, Eye, RefreshCw } from "lucide-react";
import type { MessageTemplateView } from "@/lib/whatsapp-management/contracts";
import { useOperations, field, rows, labels, type OperationRow as Row } from "./operations-client";
import { TemplateParameterField } from "./template-parameter-field";

export function ChannelTemplateComposer({ workspaceSlug, csrfToken, channelId, templates }: {
  workspaceSlug: string; csrfToken: string; channelId: string; templates: MessageTemplateView[];
}) {
  const api = useOperations(workspaceSlug, csrfToken);
  const [audience, setAudience] = useState("individuals");
  const [selected, setSelected] = useState<string[]>([]);
  const [contacts, setContacts] = useState<Row[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [chosenTags, setChosenTags] = useState<string[]>([]);
  const [relationships, setRelationships] = useState<string[]>([]);
  const [match, setMatch] = useState("any");
  const [search, setSearch] = useState("");
  const [cursor, setCursor] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [mappings, setMappings] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<Row | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(true);
  const approved = templates.filter((t) => t.status === "APPROVED" && ["MARKETING", "UTILITY"].includes(t.category));
  const template = approved.find((t) => t.template_record_id === templateId);
  const fields = rows(template?.send_schema?.fields);
  const templateRevision = JSON.stringify(template && { id: template.provider_template_id, status: template.status, language: template.language, category: template.category, components: template.components, schema: template.send_schema });
  useEffect(() => {
    const ids = new URL(window.location.href).searchParams.get("contacts");
    setSelected([...new Set((ids || "").split(",").filter((id) => /^[a-zA-Z0-9_-]+$/.test(id)))].slice(0, 100));
  }, []);
  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(() => {
      void api(`people?search=${encodeURIComponent(search)}`).then((result) => {
        if (!active) return;
        setContacts(rows(result.contacts)); setCategories(labels(result.categories)); setCursor(String(result.next_cursor || ""));
      }).catch((e) => { if (active) setError(String(e)); });
    }, 150);
    return () => { active = false; window.clearTimeout(timer); };
  }, [api, search]);
  useEffect(() => { setDirty(true); }, [selected, audience, templateId, templateRevision, chosenTags, relationships, match]);
  useEffect(() => {
    if (!preview || preview.status !== "queued") return;
    let active = true;
    const timer = window.setInterval(() => {
      void api(`dispatches/${field(preview, "dispatch_id")}`).then((result) => { if (active) setPreview(result); }).catch((e) => { if (active) setError(String(e)); });
    }, 3000);
    return () => { active = false; window.clearInterval(timer); };
  }, [api, preview]);
  async function run(operation: () => Promise<void>) { setError(""); setBusy(true); try { await operation(); } catch (e) { setError(e instanceof Error ? e.message : String(e)); } finally { setBusy(false); } }
  const toggle = (items: string[], key: string, checked: boolean) => checked ? [...items, key] : items.filter((item) => item !== key);
  function createPreview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget);
    void run(async () => {
      setPreview(await api("dispatches", "POST", { idempotency_key: crypto.randomUUID(),
        contact_ids: audience === "individuals" ? selected : [],
        categories: audience === "filters" ? chosenTags : [], relationships: audience === "filters" ? relationships : [],
        category_match: match, all_contacts: audience === "all", channel_id: channelId,
        template_record_id: templateId, purpose: form.get("purpose"), business_reference: form.get("reference"),
        values, field_mappings: mappings, recipient_limit: Number(form.get("limit")),
      })); setDirty(false);
    });
  }
  return <section className="operational-section people-composer" aria-label="Send approved template">
    <h2>Send approved template</h2>{error && <p role="alert" className="error-state">{error}</p>}
    <form className="knowledge-form" onSubmit={createPreview} onChange={() => setDirty(true)}>
      <fieldset><legend>Recipients</legend><label>Audience<select name="audience" value={audience} onChange={(e) => setAudience(e.target.value)}><option value="individuals">Individual contacts</option><option value="filters">Tags and relationships</option><option value="all">All workspace contacts</option></select></label>
        {audience === "individuals" && <><label>Find contacts<input name="recipient_search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Name or phone number" /></label><p>{selected.length} selected</p><div className="audience-picker">{contacts.map((c) => <label key={field(c, "contact_id")}><input type="checkbox" name="recipients" checked={selected.includes(field(c, "contact_id"))} disabled={selected.length >= 100 && !selected.includes(field(c, "contact_id"))} onChange={(e) => setSelected((old) => toggle(old, field(c, "contact_id"), e.target.checked))} /><strong>{field(c, "preferred_name") || field(c, "display_name") || "Unnamed contact"}</strong><small>{rows(c.identities).filter((i) => i.channel_id === channelId).map((i) => field(i, "provider_identity")).join(", ") || "Not reachable on this channel"}</small></label>)}{!contacts.length && <p>No matching contacts.</p>}</div>{cursor && <button type="button" className="duka-button duka-button--quiet" onClick={() => void run(async () => { const result = await api(`people?search=${encodeURIComponent(search)}&after=${encodeURIComponent(cursor)}`); setContacts((old) => [...old, ...rows(result.contacts)]); setCursor(String(result.next_cursor || "")); })}>Load more</button>}</>}
        {audience === "filters" && <><fieldset><legend>Relationships</legend>{["prospect", "customer", "member", "staff"].map((key) => <label key={key}><input type="checkbox" name="relationship" checked={relationships.includes(key)} onChange={(e) => setRelationships((old) => toggle(old, key, e.target.checked))} />{key[0].toUpperCase() + key.slice(1)}</label>)}</fieldset><fieldset><legend>Tags</legend><label>Tag matching<select name="match" value={match} onChange={(e) => setMatch(e.target.value)}><option value="any">Any selected tag</option><option value="all">All selected tags</option></select></label>{categories.map((key) => <label key={key}><input type="checkbox" name="tag" checked={chosenTags.includes(key)} onChange={(e) => setChosenTags((old) => toggle(old, key, e.target.checked))} />{key.replaceAll("_", " ")}</label>)}</fieldset></>}
        <label>Recipient limit<input name="limit" type="number" defaultValue={100} min={1} max={100} required /></label>
      </fieldset>
      <fieldset><legend>Approved template</legend><label>Template<select name="template" required value={templateId} onChange={(e) => { setTemplateId(e.target.value); setValues({}); setMappings({}); }}><option value="">Select template</option>{approved.map((t) => <option key={t.template_record_id} value={t.template_record_id}>{t.name} ({t.category}, {t.language})</option>)}</select></label>
        {rows(template?.components).filter((c) => c.text).map((c, index) => <blockquote className="message-preview" key={index}>{field(c, "text")}</blockquote>)}
        {fields.map((f) => <div className="parameter-field" key={field(f, "key")}><TemplateParameterField definition={f} value={values[field(f, "key")]} disabled={Boolean(mappings[field(f, "key")])} onChange={(value) => setValues({ ...values, [field(f, "key")]: value })} />{field(f, "value_type") === "text" && <label>Personalization<select name={`mapping-${field(f, "key")}`} value={mappings[field(f, "key")] || ""} onChange={(e) => setMappings((old) => { const next = { ...old }; if (e.target.value) next[field(f, "key")] = e.target.value; else delete next[field(f, "key")]; return next; })}><option value="">Fixed value</option><option value="contact.preferred_name">Contact preferred name</option><option value="contact.display_name">Contact full name</option></select></label>}</div>)}
        <label>Purpose<input key={template?.category} name="purpose" required defaultValue={template?.category === "UTILITY" ? "business_update" : "all_marketing"} maxLength={100} /></label><label>Business / campaign reference<input name="reference" required minLength={3} maxLength={200} /></label>
      </fieldset><button className="duka-button duka-button--secondary" disabled={busy || !template || (audience === "individuals" && !selected.length) || (audience === "filters" && !chosenTags.length && !relationships.length)}><Eye size={16} />Review audience</button>
    </form>
    {preview && <div><h3>Audience review: {field(preview, "status")}</h3><p className="reference-text">{field(preview, "dispatch_id")}</p><div className="knowledge-scroll"><table><thead><tr><th>Contact</th><th>Eligibility</th><th>Status</th><th>Delivery</th><th>Outreach / journey</th></tr></thead><tbody>{rows(preview.recipients).map((r) => <tr key={field(r, "contact_id")}><td><a href={`/w/${encodeURIComponent(workspaceSlug)}/users?contact=${encodeURIComponent(field(r, "contact_id"))}`}>{field(r, "display_name") || field(r, "contact_id")}</a></td><td>{field(r, "eligibility_reason")}</td><td>{field(r, "status")}</td><td>{field(r, "delivery_status") || "-"}<small className="reference-text">{field(r, "provider_message_id")}</small>{Boolean(r.delivery_error || r.error_summary) && <p role="status">{field(r, "delivery_error") || field(r, "error_summary")}</p>}</td><td className="reference-text">{field(r, "journey_reference")}<br />{field(r, "journey_id")}</td></tr>)}</tbody></table></div>
      <div className="knowledge-actions"><button className="duka-button duka-button--primary" disabled={busy || dirty || preview.status !== "draft" || !rows(preview.recipients).some((r) => r.status === "pending")} onClick={() => void run(async () => setPreview(await api(`dispatches/${field(preview, "dispatch_id")}/confirm`, "POST", { payload_hash: preview.payload_hash })))}><Send size={16} />Confirm eligible recipients</button><button className="icon-button" aria-label="Refresh delivery evidence" title="Refresh delivery evidence" onClick={() => void run(async () => setPreview(await api(`dispatches/${field(preview, "dispatch_id")}`)))}><RefreshCw size={18} /></button></div>
    </div>}
  </section>;
}
