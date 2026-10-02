"use client";

import { StatusBadge } from "@duka/ui";
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  MessagesSquare,
  Plus,
  RefreshCw,
  Save,
  Send,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type {
  MessageTemplateListView,
  MessageTemplateView,
  WhatsAppContactListView,
  WhatsAppContactView,
  WorkspaceMessageListView,
  WorkspaceMessageView,
} from "@/lib/whatsapp-management/contracts";

type Panel = "templates" | "messages";
type TemplateCategory = "UTILITY" | "MARKETING";
type ParameterFormat = "named" | "positional";
type HeaderFormat = "NONE" | "TEXT" | "IMAGE" | "VIDEO" | "DOCUMENT" | "LOCATION";
type ButtonType = "QUICK_REPLY" | "URL" | "PHONE_NUMBER" | "COPY_CODE";
type DraftButton = { type: ButtonType; text: string; url: string; phoneNumber: string; example: string };

const initialTemplateForm = {
  name: "",
  language: "en_US",
  category: "UTILITY" as TemplateCategory,
  parameterFormat: "named" as ParameterFormat,
  headerFormat: "NONE" as HeaderFormat,
  headerText: "",
  headerExample: "",
  headerMediaHandle: "",
  bodyText: "",
  parameterExamples: {} as Record<string, string>,
  footerText: "",
  buttons: [] as DraftButton[],
};

function statusTone(status: string): "neutral" | "success" | "warning" | "danger" {
  const normalized = status.toUpperCase();
  if (["APPROVED", "COMPLETED", "DELIVERED", "READ", "SENT"].includes(normalized)) return "success";
  if (["PENDING", "SUBMITTING", "PROCESSING"].includes(normalized)) return "warning";
  if (["REJECTED", "SUBMISSION_FAILED", "FAILED"].includes(normalized)) return "danger";
  return "neutral";
}

function formatStatus(value: string | null | undefined): string {
  return (value || "unknown").replaceAll("_", " ").toLowerCase();
}

function formatTimestamp(value: string | null | undefined): string {
  if (!value) return "Not yet";
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? "Not yet" : date.toLocaleString();
}

function templateVariables(text: string, format: ParameterFormat): string[] {
  const pattern = format === "named" ? /{{\s*([a-z][a-z0-9_]*)\s*}}/g : /{{\s*(\d+)\s*}}/g;
  return [...text.matchAll(pattern)].map((match) => match[1]);
}

function parameterDefinitions(text: string, format: ParameterFormat, examples: Record<string, string>) {
  return templateVariables(text, format).map((name) => ({
    name,
    label: format === "named" ? name.replaceAll("_", " ") : `Parameter ${name}`,
    example: examples[name] || "",
    value_type: "text" as const,
  }));
}

function previewText(text: string, examples: Record<string, string>): string {
  return text.replace(/{{\s*([^{}]+?)\s*}}/g, (_, name: string) => examples[name] || `[${name}]`);
}

async function responseError(response: Response, fallback: string): Promise<string> {
  const payload = await response.json().catch(() => null) as {
    error?: { message?: string; detail?: string | null };
  } | null;
  return payload?.error?.detail || payload?.error?.message || fallback;
}

function mutationHeaders(csrfToken: string): HeadersInit {
  return { "Content-Type": "application/json", "x-duka-csrf": csrfToken };
}

function TemplateForm({ csrfToken, onSaved, onDismiss, workspaceSlug, channelId }: {
  csrfToken: string;
  onSaved: (template: MessageTemplateView) => void;
  onDismiss: () => void;
  workspaceSlug: string;
  channelId: string;
}) {
  const [form, setForm] = useState(initialTemplateForm);
  const [draft, setDraft] = useState<MessageTemplateView | null>(null);
  const [issues, setIssues] = useState<Array<{ severity: "error" | "warning"; message: string; path: string }>>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const idempotencyKey = useRef<string | null>(null);
  const base = `/api/bff/workspaces/${encodeURIComponent(workspaceSlug)}/channels/${encodeURIComponent(channelId)}/message-templates`;
  const headerVariables = templateVariables(form.headerText, form.parameterFormat);
  const bodyVariables = templateVariables(form.bodyText, form.parameterFormat);

  const definition = {
    parameter_format: form.parameterFormat,
    header: form.headerFormat === "NONE" ? null : {
      format: form.headerFormat,
      text: form.headerFormat === "TEXT" ? form.headerText : null,
      parameters: form.headerFormat === "TEXT" ? parameterDefinitions(form.headerText, form.parameterFormat, form.parameterExamples) : [],
      example_media_handle: ["IMAGE", "VIDEO", "DOCUMENT"].includes(form.headerFormat) ? form.headerMediaHandle : null,
    },
    body: {
      text: form.bodyText,
      parameters: parameterDefinitions(form.bodyText, form.parameterFormat, form.parameterExamples),
    },
    footer_text: form.footerText || null,
    buttons: form.buttons.map((button) => ({
      type: button.type,
      text: button.text || null,
      url: button.type === "URL" ? button.url : null,
      phone_number: button.type === "PHONE_NUMBER" ? button.phoneNumber : null,
      example: ["URL", "COPY_CODE"].includes(button.type) ? button.example : null,
    })),
  };

  async function saveDraft(event: React.FormEvent) {
    event.preventDefault();
    setBusy("save");
    setError(null);
    setIssues([]);
    idempotencyKey.current ||= `workspace-template-draft-${crypto.randomUUID()}`;
    try {
      const updating = Boolean(draft);
      const response = await fetch(
        updating ? `${base}/${encodeURIComponent(draft!.template_record_id)}/draft` : `${base}/drafts`,
        {
          method: updating ? "PUT" : "POST",
          headers: mutationHeaders(csrfToken),
          body: JSON.stringify({
            name: form.name,
            language: form.language,
            category: form.category,
            definition,
            ...(updating ? { draft_version: draft!.draft_version } : { idempotency_key: idempotencyKey.current }),
          }),
        },
      );
      if (!response.ok) throw new Error(await responseError(response, "Draft could not be saved."));
      const saved = await response.json() as MessageTemplateView;
      setDraft(saved);
      setIssues(saved.validation_errors);
      onSaved(saved);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Draft could not be saved.");
    } finally { setBusy(null); }
  }

  async function preflight() {
    if (!draft) return;
    setBusy("validate");
    setError(null);
    try {
      const response = await fetch(`${base}/${encodeURIComponent(draft.template_record_id)}/validate`, { method: "POST", headers: mutationHeaders(csrfToken) });
      if (!response.ok) throw new Error(await responseError(response, "Preflight validation failed."));
      const result = await response.json() as { valid: boolean; issues: typeof issues };
      setIssues(result.issues);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Preflight validation failed."); }
    finally { setBusy(null); }
  }

  async function submitToMeta() {
    if (!draft) return;
    setBusy("submit");
    setError(null);
    try {
      const response = await fetch(`${base}/${encodeURIComponent(draft.template_record_id)}/submit`, {
        method: "POST",
        headers: mutationHeaders(csrfToken),
        body: JSON.stringify({ idempotency_key: `workspace-template-submit-${crypto.randomUUID()}` }),
      });
      if (!response.ok) throw new Error(await responseError(response, "Template submission failed."));
      onSaved(await response.json() as MessageTemplateView);
      onDismiss();
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Template submission failed."); }
    finally { setBusy(null); }
  }

  function addButton() {
    setForm((current) => ({ ...current, buttons: [...current.buttons, { type: "QUICK_REPLY", text: "", url: "", phoneNumber: "", example: "" }] }));
  }

  return (
    <form className="whatsapp-form template-editor" onSubmit={saveDraft}>
      <div className="section-heading"><div><h2>Message template</h2><p>Build, validate, and submit a standard Meta template.</p></div><button aria-label="Close template form" className="icon-button" onClick={onDismiss} title="Close" type="button"><X size={17} /></button></div>
      {error ? <div className="inline-error"><AlertTriangle size={17} /><span>{error}</span></div> : null}
      <div className="whatsapp-form-grid">
        <label>Template name<input autoComplete="off" disabled={Boolean(draft)} onChange={(event) => setForm({ ...form, name: event.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "_") })} pattern="[a-z0-9][a-z0-9_]+" required value={form.name} /></label>
        <label>Language<select disabled={Boolean(draft)} onChange={(event) => setForm({ ...form, language: event.target.value })} value={form.language}><option value="en_US">English (US)</option><option value="en">English</option><option value="sw">Swahili</option></select></label>
        <label>Category<select onChange={(event) => setForm({ ...form, category: event.target.value as TemplateCategory })} value={form.category}><option value="UTILITY">Utility</option><option value="MARKETING">Marketing</option></select></label>
        <label>Parameters<select onChange={(event) => setForm({ ...form, parameterFormat: event.target.value as ParameterFormat, parameterExamples: {} })} value={form.parameterFormat}><option value="named">Named</option><option value="positional">Positional</option></select></label>
      </div>
      <div className="whatsapp-form-grid">
        <label>Header<select onChange={(event) => setForm({ ...form, headerFormat: event.target.value as HeaderFormat })} value={form.headerFormat}><option value="NONE">None</option><option value="TEXT">Text</option><option value="IMAGE">Image</option><option value="VIDEO">Video</option><option value="DOCUMENT">Document</option><option value="LOCATION">Location</option></select></label>
        {form.headerFormat === "TEXT" ? <label>Header text<input maxLength={60} onChange={(event) => setForm({ ...form, headerText: event.target.value })} required value={form.headerText} /></label> : null}
        {["IMAGE", "VIDEO", "DOCUMENT"].includes(form.headerFormat) ? <label>Meta sample media handle<input onChange={(event) => setForm({ ...form, headerMediaHandle: event.target.value })} required value={form.headerMediaHandle} /></label> : null}
      </div>
      {headerVariables.map((name) => <label key={`header-${name}`}>Header example for {`{{${name}}}`}<input onChange={(event) => setForm((current) => ({ ...current, parameterExamples: { ...current.parameterExamples, [name]: event.target.value } }))} required value={form.parameterExamples[name] || ""} /></label>)}
      <label>Body text<textarea maxLength={1024} onChange={(event) => setForm({ ...form, bodyText: event.target.value })} placeholder={form.parameterFormat === "named" ? "Hello {{customer_name}}, your appointment is confirmed." : "Hello {{1}}, your appointment is confirmed."} required rows={5} value={form.bodyText} /></label>
      {bodyVariables.map((name) => <label key={`body-${name}`}>Body example for {`{{${name}}}`}<input onChange={(event) => setForm((current) => ({ ...current, parameterExamples: { ...current.parameterExamples, [name]: event.target.value } }))} required value={form.parameterExamples[name] || ""} /></label>)}
      <label>Footer <span>Optional</span><input maxLength={60} onChange={(event) => setForm({ ...form, footerText: event.target.value })} value={form.footerText} /></label>
      <div className="template-buttons-heading"><strong>Buttons</strong><button className="duka-button duka-button--secondary" disabled={form.buttons.length >= 10} onClick={addButton} type="button"><Plus size={15} />Add button</button></div>
      {form.buttons.map((button, index) => <div className="template-button-row" key={index}>
        <label>Type<select onChange={(event) => setForm((current) => ({ ...current, buttons: current.buttons.map((item, itemIndex) => itemIndex === index ? { ...item, type: event.target.value as ButtonType } : item) }))} value={button.type}><option value="QUICK_REPLY">Quick reply</option><option value="URL">Website URL</option><option value="PHONE_NUMBER">Call phone</option><option value="COPY_CODE">Copy code</option></select></label>
        {button.type !== "COPY_CODE" ? <label>Label<input maxLength={25} onChange={(event) => setForm((current) => ({ ...current, buttons: current.buttons.map((item, itemIndex) => itemIndex === index ? { ...item, text: event.target.value } : item) }))} required value={button.text} /></label> : null}
        {button.type === "URL" ? <><label>HTTPS URL<input onChange={(event) => setForm((current) => ({ ...current, buttons: current.buttons.map((item, itemIndex) => itemIndex === index ? { ...item, url: event.target.value } : item) }))} required value={button.url} /></label><label>Complete example URL<input onChange={(event) => setForm((current) => ({ ...current, buttons: current.buttons.map((item, itemIndex) => itemIndex === index ? { ...item, example: event.target.value } : item) }))} value={button.example} /></label></> : null}
        {button.type === "PHONE_NUMBER" ? <label>Phone number<input onChange={(event) => setForm((current) => ({ ...current, buttons: current.buttons.map((item, itemIndex) => itemIndex === index ? { ...item, phoneNumber: event.target.value } : item) }))} required value={button.phoneNumber} /></label> : null}
        {button.type === "COPY_CODE" ? <label>Example code<input maxLength={20} onChange={(event) => setForm((current) => ({ ...current, buttons: current.buttons.map((item, itemIndex) => itemIndex === index ? { ...item, example: event.target.value } : item) }))} required value={button.example} /></label> : null}
        <button aria-label={`Remove button ${index + 1}`} className="icon-button" onClick={() => setForm((current) => ({ ...current, buttons: current.buttons.filter((_, itemIndex) => itemIndex !== index) }))} title="Remove button" type="button"><Trash2 size={16} /></button>
      </div>)}
      <div className="template-preview"><small>WhatsApp preview</small>{form.headerFormat === "TEXT" ? <strong>{previewText(form.headerText, form.parameterExamples)}</strong> : form.headerFormat !== "NONE" ? <div className="template-preview__media">{form.headerFormat.toLowerCase()} header</div> : null}<p>{previewText(form.bodyText, form.parameterExamples) || "Your message body appears here."}</p>{form.footerText ? <small>{form.footerText}</small> : null}<div>{form.buttons.map((button, index) => <button disabled key={index} type="button">{button.type === "COPY_CODE" ? "Copy offer code" : button.text || "Button"}</button>)}</div></div>
      {issues.length ? <div className="template-issues">{issues.map((issue, index) => <div className={issue.severity === "error" ? "inline-error" : "inline-warning"} key={`${issue.path}-${index}`}><AlertTriangle size={16} /><span>{issue.message}</span></div>)}</div> : draft ? <div className="inline-success"><CheckCircle2 size={16} /> Draft has no preflight findings.</div> : null}
      <div className="whatsapp-form-actions"><button className="duka-button duka-button--secondary" onClick={onDismiss} type="button">Close</button>{draft ? <button className="duka-button duka-button--secondary" disabled={Boolean(busy)} onClick={() => void preflight()} type="button"><CheckCircle2 size={16} />{busy === "validate" ? "Checking..." : "Run preflight"}</button> : null}<button className="duka-button duka-button--secondary" disabled={Boolean(busy)} type="submit"><Save size={16} />{busy === "save" ? "Saving..." : "Save draft"}</button>{draft ? <button className="duka-button duka-button--primary" disabled={Boolean(busy) || issues.some((issue) => issue.severity === "error")} onClick={() => void submitToMeta()} type="button"><FileText size={17} />{busy === "submit" ? "Submitting..." : "Submit to Meta"}</button> : null}</div>
    </form>
  );
}

function SendMessageForm({
  contacts,
  csrfToken,
  onSent,
  templates,
  workspaceSlug,
  channelId,
}: {
  contacts: WhatsAppContactView[];
  csrfToken: string;
  onSent: (message: WorkspaceMessageView) => void;
  templates: MessageTemplateView[];
  workspaceSlug: string;
  channelId: string;
}) {
  const approved = templates.filter((template) => template.status.toUpperCase() === "APPROVED" && template.category !== "AUTHENTICATION");
  const [templateId, setTemplateId] = useState("");
  const [recipient, setRecipient] = useState("");
  const [purpose, setPurpose] = useState("");
  const [reference, setReference] = useState("");
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const idempotencyKey = useRef<string | null>(null);
  const template = approved.find((item) => item.template_record_id === templateId);
  const sendFields = template?.send_schema.fields || [];

  function chooseTemplate(value: string) {
    setTemplateId(value);
    setValues({});
    idempotencyKey.current = null;
  }

  function setValue(key: string, value: unknown) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function setObjectValue(key: string, property: string, value: string | number) {
    setValues((current) => ({
      ...current,
      [key]: { ...(typeof current[key] === "object" ? current[key] as Record<string, unknown> : { code: "KES" }), [property]: value },
    }));
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    idempotencyKey.current ||= `workspace-message-${crypto.randomUUID()}`;
    try {
      const response = await fetch(
        `/api/bff/workspaces/${encodeURIComponent(workspaceSlug)}/channels/${encodeURIComponent(channelId)}/messages`,
        {
          method: "POST",
          headers: mutationHeaders(csrfToken),
          body: JSON.stringify({
            recipient,
            template_record_id: templateId,
            body_parameters: [],
            header_parameters: [],
            values,
            purpose,
            business_reference: reference,
            idempotency_key: idempotencyKey.current,
          }),
        },
      );
      if (!response.ok) throw new Error(await responseError(response, "Message could not be sent."));
      onSent(await response.json() as WorkspaceMessageView);
      idempotencyKey.current = null;
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Message could not be sent.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="whatsapp-form whatsapp-send-form" onSubmit={submit}>
      <div className="section-heading"><div><h2>Send approved template</h2><p>Use a known channel contact and record the business purpose.</p></div><Send size={19} /></div>
      {error ? <div className="inline-error"><AlertTriangle size={17} /><span>{error}</span></div> : null}
      <div className="whatsapp-form-grid">
        <label>Template<select onChange={(event) => chooseTemplate(event.target.value)} required value={templateId}><option value="">Select approved template</option>{approved.map((item) => <option key={item.template_record_id} value={item.template_record_id}>{item.name} ({item.category.toLowerCase()})</option>)}</select></label>
        <label>Contact<select onChange={(event) => setRecipient(event.target.value)} required value={recipient}><option value="">Select active contact</option>{contacts.map((contact) => <option key={contact.contact_id} value={contact.recipient}>{contact.display_phone_number} ({contact.contact_type})</option>)}</select></label>
      </div>
      {sendFields.map((field) => {
        const current = values[field.key];
        if (field.value_type === "currency") return <fieldset className="send-field-group" key={field.key}><legend>{field.label}</legend><div className="whatsapp-form-grid"><label>Display value<input onChange={(event) => setObjectValue(field.key, "fallback_value", event.target.value)} required={field.required} value={(current as Record<string, string> | undefined)?.fallback_value || ""} /></label><label>Currency code<input maxLength={3} onChange={(event) => setObjectValue(field.key, "code", event.target.value.toUpperCase())} required={field.required} value={(current as Record<string, string> | undefined)?.code || "KES"} /></label><label>Amount x 1000<input min="0" onChange={(event) => setObjectValue(field.key, "amount_1000", Number(event.target.value))} required={field.required} type="number" value={(current as Record<string, number> | undefined)?.amount_1000 ?? ""} /></label></div></fieldset>;
        if (field.value_type === "location") return <fieldset className="send-field-group" key={field.key}><legend>{field.label}</legend><div className="whatsapp-form-grid"><label>Latitude<input onChange={(event) => setObjectValue(field.key, "latitude", event.target.value)} required={field.required} type="number" value={(current as Record<string, string> | undefined)?.latitude || ""} /></label><label>Longitude<input onChange={(event) => setObjectValue(field.key, "longitude", event.target.value)} required={field.required} type="number" value={(current as Record<string, string> | undefined)?.longitude || ""} /></label><label>Location name<input onChange={(event) => setObjectValue(field.key, "name", event.target.value)} required={field.required} value={(current as Record<string, string> | undefined)?.name || ""} /></label><label>Address<input onChange={(event) => setObjectValue(field.key, "address", event.target.value)} required={field.required} value={(current as Record<string, string> | undefined)?.address || ""} /></label></div></fieldset>;
        const inputType = field.value_type === "date_time" ? "datetime-local" : "text";
        const placeholder = ["image", "video", "document"].includes(field.value_type) ? "Meta media ID or HTTPS URL" : field.value_type === "url_suffix" ? "Dynamic URL value" : field.value_type === "copy_code" ? "Offer code" : undefined;
        return <label key={field.key}>{field.label}{!field.required ? <span>Optional</span> : null}<input onChange={(event) => setValue(field.key, event.target.value)} placeholder={placeholder} required={field.required} type={inputType} value={String(current || "")} /></label>;
      })}
      <div className="whatsapp-form-grid">
        <label>Business purpose<input onChange={(event) => setPurpose(event.target.value)} placeholder={template?.category === "MARKETING" ? "catalog_updates" : "appointment_confirmation"} required value={purpose} /></label>
        <label>Business reference<input onChange={(event) => setReference(event.target.value)} placeholder="APT-001" required value={reference} /></label>
      </div>
      {template?.category === "MARKETING" ? <p className="field-help">Duka will send only when the selected contact has active consent for this purpose.</p> : null}
      <div className="whatsapp-form-actions"><button className="duka-button duka-button--primary" disabled={busy || !templateId || !recipient} type="submit"><Send size={17} />{busy ? "Sending..." : "Send template"}</button></div>
    </form>
  );
}

export function WhatsAppChannelManagement({
  canManage,
  channelId,
  csrfToken,
  workspaceSlug,
}: {
  canManage: boolean;
  channelId: string;
  csrfToken: string;
  workspaceSlug: string;
}) {
  const [panel, setPanel] = useState<Panel>("templates");
  const [templates, setTemplates] = useState<MessageTemplateView[]>([]);
  const [contacts, setContacts] = useState<WhatsAppContactView[]>([]);
  const [messages, setMessages] = useState<WorkspaceMessageView[]>([]);
  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const pollingRequest = useRef<string | null>(null);
  const base = `/api/bff/workspaces/${encodeURIComponent(workspaceSlug)}/channels/${encodeURIComponent(channelId)}`;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const requests = [fetch(`${base}/message-templates`, { cache: "no-store" }), fetch(`${base}/messages`, { cache: "no-store" })];
      if (canManage) requests.push(fetch(`${base}/contacts`, { cache: "no-store" }));
      const responses = await Promise.all(requests);
      const failed = responses.find((response) => !response.ok);
      if (failed) throw new Error(await responseError(failed, "WhatsApp operations could not be loaded."));
      const templateData = await responses[0].json() as MessageTemplateListView;
      const messageData = await responses[1].json() as WorkspaceMessageListView;
      setTemplates(templateData.templates);
      setMessages(messageData.messages);
      if (canManage && responses[2]) setContacts((await responses[2].json() as WhatsAppContactListView).contacts);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "WhatsApp operations could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, [base, canManage]);

  useEffect(() => { void load(); }, [load]);

  useEffect(() => {
    if (!pollingRequest.current) return;
    const requestId = pollingRequest.current;
    const timer = window.setInterval(async () => {
      const response = await fetch(`${base}/messages/${encodeURIComponent(requestId)}`, { cache: "no-store" });
      if (!response.ok) return;
      const message = await response.json() as WorkspaceMessageView;
      setMessages((current) => [message, ...current.filter((item) => item.request_id !== message.request_id)]);
      if (["delivered", "read", "failed"].includes((message.delivery_status || "").toLowerCase()) || message.processing_status === "failed") {
        pollingRequest.current = null;
        window.clearInterval(timer);
      }
    }, 3_000);
    return () => window.clearInterval(timer);
  }, [base, messages]);

  const approvedCount = useMemo(() => templates.filter((item) => item.status.toUpperCase() === "APPROVED").length, [templates]);

  async function reconcile() {
    setBusy("reconcile");
    setError(null);
    setNotice(null);
    try {
      const response = await fetch(`${base}/message-templates/reconcile`, { method: "POST", headers: mutationHeaders(csrfToken) });
      if (!response.ok) throw new Error(await responseError(response, "Template status could not be reconciled."));
      const result = await response.json() as { approved: number; pending: number; rejected: number };
      setNotice(`${result.approved} approved, ${result.pending} pending, ${result.rejected} rejected.`);
      await load();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Template status could not be reconciled.");
    } finally { setBusy(null); }
  }

  async function removeTemplate(template: MessageTemplateView) {
    const destination = template.provider_template_id ? "Meta and this workspace" : "this workspace";
    if (!window.confirm(`Delete ${template.name} from ${destination}?`)) return;
    setBusy(template.template_record_id);
    try {
      const response = await fetch(`${base}/message-templates/${encodeURIComponent(template.template_record_id)}`, { method: "DELETE", headers: mutationHeaders(csrfToken) });
      if (!response.ok) throw new Error(await responseError(response, "Template could not be deleted."));
      setTemplates((current) => current.filter((item) => item.template_record_id !== template.template_record_id));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Template could not be deleted.");
    } finally { setBusy(null); }
  }

  if (loading) return <div className="loading-state" aria-live="polite"><RefreshCw className="spin" size={18} />Loading WhatsApp operations...</div>;

  return (
    <div className="whatsapp-operations">
      <div className="whatsapp-tabs" role="tablist" aria-label="WhatsApp operations">
        <button aria-selected={panel === "templates"} className={panel === "templates" ? "is-active" : ""} onClick={() => setPanel("templates")} role="tab" type="button"><FileText size={16} />Templates <span>{templates.length}</span></button>
        <button aria-selected={panel === "messages"} className={panel === "messages" ? "is-active" : ""} onClick={() => setPanel("messages")} role="tab" type="button"><MessagesSquare size={16} />Messages <span>{messages.length}</span></button>
      </div>
      {error ? <div className="error-state"><AlertTriangle size={20} /><div><strong>WhatsApp operation unavailable</strong><p>{error}</p><button className="duka-button duka-button--secondary" onClick={() => void load()} type="button">Retry</button></div></div> : null}
      {notice ? <div className="inline-success">{notice}</div> : null}

      {panel === "templates" ? <>
        <div className="operations-toolbar"><div><strong>{approvedCount} approved</strong><span>Only approved templates can be sent.</span></div>{canManage ? <div><button className="duka-button duka-button--secondary" disabled={busy === "reconcile"} onClick={() => void reconcile()} type="button"><RefreshCw className={busy === "reconcile" ? "spin" : ""} size={16} />Reconcile</button><button className="duka-button duka-button--primary" onClick={() => setShowTemplateForm(true)} type="button"><Plus size={16} />Create template</button></div> : null}</div>
        {showTemplateForm ? <TemplateForm channelId={channelId} csrfToken={csrfToken} onSaved={(template) => setTemplates((current) => [template, ...current.filter((item) => item.template_record_id !== template.template_record_id)])} onDismiss={() => setShowTemplateForm(false)} workspaceSlug={workspaceSlug} /> : null}
        <div className="operations-table">
          <div className="operations-table__header"><span>Template</span><span>Category</span><span>Status</span><span>Updated</span><span>Action</span></div>
          {templates.length ? templates.map((template) => <div className="operations-table__row" key={template.template_record_id}><div><strong>{template.name}</strong><small>{template.language} / {template.source} / quality {template.quality_score.toLowerCase()}</small>{template.rejection_reason ? <small className="danger-text">{template.rejection_reason}</small> : null}</div><span>{formatStatus(template.category)}</span><StatusBadge tone={statusTone(template.status)}>{formatStatus(template.status)}</StatusBadge><span>{formatTimestamp(template.updated_at)}</span><div>{canManage ? <button aria-label={`Delete ${template.name}`} className="icon-button" disabled={busy === template.template_record_id} onClick={() => void removeTemplate(template)} title="Delete template" type="button"><Trash2 size={16} /></button> : null}</div></div>) : <p className="operations-empty">No message templates have been synchronized for this channel.</p>}
        </div>
        {!canManage ? <p className="permission-message">You can inspect template status, but a channel administrator must make changes.</p> : null}
      </> : <>
        {canManage ? <SendMessageForm channelId={channelId} contacts={contacts} csrfToken={csrfToken} onSent={(message) => { pollingRequest.current = message.request_id; setMessages((current) => [message, ...current.filter((item) => item.request_id !== message.request_id)]); setNotice("Meta accepted the message. Waiting for delivery evidence."); }} templates={templates} workspaceSlug={workspaceSlug} /> : null}
        <div className="operations-table operations-table--messages">
          <div className="operations-table__header"><span>Message</span><span>Category</span><span>Status</span><span>Evidence</span><span>Created</span></div>
          {messages.length ? messages.map((message) => <div className="operations-table__row" key={message.request_id}><div><strong>{message.template_name}</strong><small>{message.provider_message_id || "Awaiting Meta ID"}</small>{message.error_code ? <small className="danger-text">{message.error_code}</small> : null}</div><span>{formatStatus(message.template_category)}</span><StatusBadge tone={statusTone(message.delivery_status || message.processing_status)}>{formatStatus(message.delivery_status || message.processing_status)}</StatusBadge><div><strong>{message.read_at ? "Read" : message.delivered_at ? "Delivered" : message.sent_at ? "Sent" : "Pending"}</strong><small>{formatTimestamp(message.read_at || message.delivered_at || message.sent_at)}</small></div><span>{formatTimestamp(message.created_at)}</span></div>) : <p className="operations-empty">No template messages have been sent from this workspace.</p>}
        </div>
        {!canManage ? <p className="permission-message">A channel administrator must select contacts and send templates.</p> : null}
      </>}
    </div>
  );
}
