"use client";

import type {
  WhatsAppContactTag,
  WhatsAppMarketingCampaign,
  WhatsAppMarketingSegment,
  WhatsAppTemplateActivation,
} from "@duka/api-client";
import { StatusBadge } from "@duka/ui";
import { AlertTriangle, CheckCircle2, Megaphone, Plus, Save, Search, Send, Tags, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import type { MessageTemplateView, WhatsAppContactView } from "@/lib/whatsapp-management/contracts";
import { WhatsAppContactDialog } from "@/components/whatsapp-contact-dialog";

type AudienceMode = "selected" | "segment" | "all_eligible";

function mutationHeaders(csrfToken: string): HeadersInit {
  return { "Content-Type": "application/json", "x-duka-csrf": csrfToken };
}

async function responseError(response: Response, fallback: string): Promise<string> {
  const payload = await response.json().catch(() => null) as { error?: { message?: string; detail?: string | null } } | null;
  return payload?.error?.detail || payload?.error?.message || fallback;
}

function statusTone(status: string): "neutral" | "success" | "warning" | "danger" {
  const normalized = status.toLowerCase();
  if (["active", "completed", "sent", "delivered"].includes(normalized)) return "success";
  if (["draft", "validated", "tested", "scheduled", "processing"].includes(normalized)) return "warning";
  if (["failed", "cancelled", "suspended"].includes(normalized)) return "danger";
  return "neutral";
}

function contactLabel(contact: WhatsAppContactView): string {
  return contact.preferred_name || contact.display_name || contact.display_phone_number;
}

export function ContactDirectory({ base, canManage, contacts, csrfToken, onContactsChanged }: {
  base: string;
  canManage: boolean;
  contacts: WhatsAppContactView[];
  csrfToken: string;
  onContactsChanged: (contacts: WhatsAppContactView[]) => void;
}) {
  const [tags, setTags] = useState<WhatsAppContactTag[]>([]);
  const [segments, setSegments] = useState<WhatsAppMarketingSegment[]>([]);
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [editing, setEditing] = useState<WhatsAppContactView | null>(null);
  const [contactForm, setContactForm] = useState<{ contact?: WhatsAppContactView } | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [tagName, setTagName] = useState("");
  const [segmentName, setSegmentName] = useState("");
  const [segmentTag, setSegmentTag] = useState("");
  const [segmentType, setSegmentType] = useState("");
  const [segmentPurpose, setSegmentPurpose] = useState("all_marketing");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadMetadata() {
    const [tagResponse, segmentResponse] = await Promise.all([
      fetch(`${base}/contact-tags`, { cache: "no-store" }),
      fetch(`${base}/marketing-segments`, { cache: "no-store" }),
    ]);
    if (!tagResponse.ok) throw new Error(await responseError(tagResponse, "Contact tags could not be loaded."));
    if (!segmentResponse.ok) throw new Error(await responseError(segmentResponse, "Marketing segments could not be loaded."));
    setTags((await tagResponse.json() as { tags: WhatsAppContactTag[] }).tags);
    setSegments((await segmentResponse.json() as { segments: WhatsAppMarketingSegment[] }).segments);
  }

  useEffect(() => { if (canManage) void loadMetadata().catch((reason) => setError(reason.message)); }, [base, canManage]);

  const filtered = useMemo(() => contacts.filter((contact) => {
    const needle = search.trim().toLowerCase();
    const matchesSearch = !needle || [contact.display_phone_number, contact.display_name, contact.preferred_name]
      .some((value) => value?.toLowerCase().includes(needle));
    return matchesSearch && (!tagFilter || contact.tags.includes(tagFilter));
  }), [contacts, search, tagFilter]);

  async function saveContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    setBusy(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch(`${base}/contacts/${encodeURIComponent(editing.contact_id)}`, {
        method: "PATCH",
        headers: mutationHeaders(csrfToken),
        body: JSON.stringify({
          display_name: String(form.get("display_name") || "") || null,
          preferred_name: String(form.get("preferred_name") || "") || null,
          contact_type: String(form.get("contact_type") || "unknown"),
        }),
      });
      if (!response.ok) throw new Error(await responseError(response, "Contact could not be updated."));
      const saved = await response.json() as WhatsAppContactView;
      const tagKeys = form.getAll("tag_keys").map(String);
      const tagResponse = await fetch(`${base}/contacts/${encodeURIComponent(editing.contact_id)}/tags`, {
        method: "PUT",
        headers: mutationHeaders(csrfToken),
        body: JSON.stringify({ tag_keys: tagKeys }),
      });
      if (!tagResponse.ok) throw new Error(await responseError(tagResponse, "Contact tags could not be updated."));
      onContactsChanged(contacts.map((contact) => contact.contact_id === saved.contact_id ? { ...saved, tags: tagKeys } : contact));
      setEditing(null);
      await loadMetadata();
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Contact could not be updated."); }
    finally { setBusy(false); }
  }

  async function createTag(event: React.FormEvent) {
    event.preventDefault();
    const displayName = tagName.trim();
    if (!displayName) return;
    setBusy(true);
    setError(null);
    try {
      const response = await fetch(`${base}/contact-tags`, {
        method: "POST",
        headers: mutationHeaders(csrfToken),
        body: JSON.stringify({
          tag_key: displayName.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, ""),
          display_name: displayName,
        }),
      });
      if (!response.ok) throw new Error(await responseError(response, "Tag could not be created."));
      setTagName("");
      await loadMetadata();
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Tag could not be created."); }
    finally { setBusy(false); }
  }

  async function createSegment(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const response = await fetch(`${base}/marketing-segments`, {
        method: "POST",
        headers: mutationHeaders(csrfToken),
        body: JSON.stringify({
          name: segmentName,
          definition: {
            contact_types: segmentType ? [segmentType] : [],
            tag_keys_any: segmentTag ? [segmentTag] : [],
            consent_purpose: segmentPurpose,
          },
        }),
      });
      if (!response.ok) throw new Error(await responseError(response, "Segment could not be created."));
      setSegmentName("");
      await loadMetadata();
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Segment could not be created."); }
    finally { setBusy(false); }
  }

  return <div className="campaign-stack">
    {notice ? <div className="inline-success" role="status">{notice}</div> : null}
    {contactForm ? <WhatsAppContactDialog base={base} csrfToken={csrfToken} contact={contactForm.contact} onClose={() => setContactForm(null)} onSaved={(saved, message) => { onContactsChanged([saved, ...contacts.filter((item) => item.contact_id !== saved.contact_id)]); setNotice(message); }} /> : null}
    {error ? <div className="inline-error"><AlertTriangle size={16} />{error}</div> : null}
    <div className="operations-toolbar">
      <div><strong>{contacts.length} active contacts</strong><span>Full numbers are visible to authorized workspace administrators.</span></div>
      <div className="contact-search"><Search size={15} /><input aria-label="Search contacts" onChange={(event) => setSearch(event.target.value)} placeholder="Name or phone" value={search} /></div>
      <label className="compact-filter">Tag<select onChange={(event) => setTagFilter(event.target.value)} value={tagFilter}><option value="">All tags</option>{tags.map((tag) => <option key={tag.tag_id} value={tag.tag_key}>{tag.display_name}</option>)}</select></label>
      {canManage ? <button className="duka-button duka-button--primary" onClick={() => setContactForm({})} type="button"><Plus size={16} />Add contact</button> : null}
    </div>
    <div className="operations-table operations-table--contacts">
      <div className="operations-table__header"><span>Contact</span><span>Type</span><span>Consent</span><span>Tags</span><span>Action</span></div>
      {filtered.map((contact) => <div className="operations-table__row" key={contact.contact_id}>
        <div><strong>{contactLabel(contact)}</strong><small>{contact.display_phone_number}</small></div>
        <span>{contact.contact_type}</span>
        <div><strong>{contact.marketing_consent_status.replaceAll("_", " ")}</strong><small>{contact.consent_purposes.join(", ") || "No marketing purpose"}</small></div>
        <span>{contact.tags.join(", ") || "None"}</span>
        <div className="contact-row-actions"><button className="duka-button duka-button--secondary" disabled={!canManage} onClick={() => setEditing(contact)} type="button">Edit</button>{canManage ? <button className="duka-button duka-button--secondary" onClick={() => setContactForm({ contact })} type="button">Record permission</button> : null}</div>
      </div>)}
      {!filtered.length ? <p className="operations-empty">No contacts match these filters.</p> : null}
    </div>
    {editing ? <form className="whatsapp-form" onSubmit={saveContact}>
      <div className="section-heading"><div><h2>Edit contact</h2><p>{editing.display_phone_number}</p></div></div>
      <div className="whatsapp-form-grid"><label>Display name<input defaultValue={editing.display_name || ""} name="display_name" /></label><label>Preferred name<input defaultValue={editing.preferred_name || ""} name="preferred_name" /></label><label>Contact type<select defaultValue={editing.contact_type} name="contact_type"><option value="unknown">Unknown</option><option value="prospect">Prospect</option><option value="customer">Customer</option><option value="member">Member</option></select></label></div>
      <fieldset className="tag-picker"><legend>Categories</legend>{tags.map((tag) => <label key={tag.tag_id}><input defaultChecked={editing.tags.includes(tag.tag_key)} name="tag_keys" type="checkbox" value={tag.tag_key} />{tag.display_name}</label>)}</fieldset>
      <div className="whatsapp-form-actions"><button className="duka-button duka-button--secondary" onClick={() => setEditing(null)} type="button">Cancel</button><button className="duka-button duka-button--primary" disabled={busy} type="submit"><Save size={15} />Save contact</button></div>
    </form> : null}
    {canManage ? <div className="campaign-tools">
      <form className="whatsapp-form" onSubmit={createTag}><div className="section-heading"><div><h2>Contact category</h2><p>Create a reusable tag for manual grouping.</p></div><Tags size={18} /></div><label>Category name<input onChange={(event) => setTagName(event.target.value)} placeholder="Interested in Front Desk" required value={tagName} /></label><div className="whatsapp-form-actions"><button className="duka-button duka-button--secondary" disabled={busy} type="submit"><Plus size={15} />Create category</button></div></form>
      <form className="whatsapp-form" onSubmit={createSegment}><div className="section-heading"><div><h2>Dynamic segment</h2><p>Combine consent with contact type or category.</p></div><Users size={18} /></div><label>Segment name<input onChange={(event) => setSegmentName(event.target.value)} placeholder="Front Desk prospects" required value={segmentName} /></label><div className="whatsapp-form-grid"><label>Contact type<select onChange={(event) => setSegmentType(event.target.value)} value={segmentType}><option value="">Any type</option><option value="prospect">Prospect</option><option value="customer">Customer</option><option value="member">Member</option></select></label><label>Category<select onChange={(event) => setSegmentTag(event.target.value)} value={segmentTag}><option value="">Any category</option>{tags.map((tag) => <option key={tag.tag_id} value={tag.tag_key}>{tag.display_name}</option>)}</select></label></div><label>Required consent purpose<input onChange={(event) => setSegmentPurpose(event.target.value)} required value={segmentPurpose} /></label><div className="whatsapp-form-actions"><button className="duka-button duka-button--secondary" disabled={busy} type="submit"><Plus size={15} />Create segment</button></div></form>
    </div> : null}
    {segments.length ? <div className="segment-strip">{segments.map((segment) => <div key={segment.segment_id}><strong>{segment.name}</strong><span>{segment.eligible_count ?? 0} currently eligible</span></div>)}</div> : null}
  </div>;
}

function suggestedAction(label: string, index: number): { action: string; route: string } {
  const normalized = label.toLowerCase();
  if (normalized.includes("service")) return { action: "show_services", route: "professional.service_discovery" };
  if (normalized.includes("book") || normalized.includes("demo")) return { action: "book_demo", route: "professional.appointment_booking" };
  return { action: `template_action_${index + 1}`, route: "" };
}

export function CampaignManagement({ base, canManage, contacts, csrfToken, templates }: {
  base: string;
  canManage: boolean;
  contacts: WhatsAppContactView[];
  csrfToken: string;
  templates: MessageTemplateView[];
}) {
  const marketingTemplates = templates.filter((template) => template.category === "MARKETING" && template.status.toUpperCase() === "APPROVED");
  const [activations, setActivations] = useState<WhatsAppTemplateActivation[]>([]);
  const [segments, setSegments] = useState<WhatsAppMarketingSegment[]>([]);
  const [campaigns, setCampaigns] = useState<WhatsAppMarketingCampaign[]>([]);
  const [templateId, setTemplateId] = useState("");
  const [purpose, setPurpose] = useState("all_marketing");
  const [mappingModes, setMappingModes] = useState<Record<string, string>>({});
  const [mappingValues, setMappingValues] = useState<Record<string, string>>({});
  const [routeValues, setRouteValues] = useState<Record<string, string>>({});
  const [activation, setActivation] = useState<WhatsAppTemplateActivation | null>(null);
  const [testContact, setTestContact] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [audienceMode, setAudienceMode] = useState<AudienceMode>("selected");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [segmentId, setSegmentId] = useState("");
  const [campaignInputs, setCampaignInputs] = useState<Record<string, string>>({});
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [recipientLimit, setRecipientLimit] = useState(100);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const selectedTemplate = marketingTemplates.find((template) => template.template_record_id === templateId);
  const fields = selectedTemplate?.send_schema.fields || [];

  async function load() {
    const [activationResponse, segmentResponse, campaignResponse] = await Promise.all([
      fetch(`${base}/template-activations`, { cache: "no-store" }),
      fetch(`${base}/marketing-segments`, { cache: "no-store" }),
      fetch(`${base}/marketing-campaigns`, { cache: "no-store" }),
    ]);
    for (const response of [activationResponse, segmentResponse, campaignResponse]) {
      if (!response.ok) throw new Error(await responseError(response, "Campaign controls could not be loaded."));
    }
    setActivations((await activationResponse.json() as { activations: WhatsAppTemplateActivation[] }).activations);
    setSegments((await segmentResponse.json() as { segments: WhatsAppMarketingSegment[] }).segments);
    setCampaigns((await campaignResponse.json() as { campaigns: WhatsAppMarketingCampaign[] }).campaigns);
  }

  useEffect(() => { if (canManage) void load().catch((reason) => setError(reason.message)); }, [base, canManage]);

  function chooseTemplate(id: string) {
    const template = marketingTemplates.find((item) => item.template_record_id === id);
    const modes: Record<string, string> = {};
    const values: Record<string, string> = {};
    const routes: Record<string, string> = {};
    for (const [index, field] of (template?.send_schema.fields || []).entries()) {
      if (field.value_type === "quick_reply") {
        const suggested = suggestedAction(field.label, index);
        modes[field.key] = "action";
        values[field.key] = suggested.action;
        routes[field.key] = suggested.route;
      } else if (field.component === "body" && index === 0) {
        modes[field.key] = "contact.preferred_name";
      } else {
        modes[field.key] = "campaign";
      }
    }
    setTemplateId(id);
    setMappingModes(modes);
    setMappingValues(values);
    setRouteValues(routes);
    setActivation(null);
  }

  async function saveActivation(event: React.FormEvent) {
    event.preventDefault();
    if (!selectedTemplate) return;
    setBusy("activation");
    setError(null);
    setNotice(null);
    const field_mappings: Record<string, string> = {};
    const default_values: Record<string, unknown> = {};
    const button_routes: Record<string, string> = {};
    for (const field of fields) {
      const mode = mappingModes[field.key];
      if (mode?.startsWith("contact.")) field_mappings[field.key] = mode;
      else if (mode === "campaign") field_mappings[field.key] = `campaign.${field.key.replace(/[^a-z0-9]+/gi, "_").toLowerCase()}`;
      else if (mode === "static" || mode === "action") default_values[field.key] = mappingValues[field.key] || "";
      if (field.value_type === "quick_reply" && mappingValues[field.key] && routeValues[field.key]) {
        button_routes[mappingValues[field.key]] = routeValues[field.key];
      }
    }
    try {
      const response = await fetch(`${base}/message-templates/${encodeURIComponent(selectedTemplate.template_record_id)}/activations`, {
        method: "POST",
        headers: mutationHeaders(csrfToken),
        body: JSON.stringify({ consent_purpose: purpose, field_mappings, default_values, button_routes, missing_value_policy: "skip_recipient" }),
      });
      if (!response.ok) throw new Error(await responseError(response, "Template activation could not be saved."));
      const saved = await response.json() as WhatsAppTemplateActivation;
      setActivation(saved);
      setActivations((current) => [saved, ...current]);
      setNotice(saved.validation_errors.length ? "Activation saved with validation findings." : "Activation validated. Send one test before activation.");
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Template activation could not be saved."); }
    finally { setBusy(null); }
  }

  async function testActivation() {
    if (!activation || !testContact) return;
    setBusy("test");
    setError(null);
    try {
      const response = await fetch(`${base}/template-activations/${encodeURIComponent(activation.activation_id)}/test`, {
        method: "POST",
        headers: mutationHeaders(csrfToken),
        body: JSON.stringify({ contact_id: testContact, campaign_values: campaignValues(activation), idempotency_key: `activation-test-${crypto.randomUUID()}` }),
      });
      if (!response.ok) throw new Error(await responseError(response, "Activation test could not be sent."));
      const refreshed = await fetch(`${base}/template-activations/${encodeURIComponent(activation.activation_id)}`, { cache: "no-store" });
      const tested = await refreshed.json() as WhatsAppTemplateActivation;
      setActivation(tested);
      setActivations((current) => current.map((item) => item.activation_id === tested.activation_id ? tested : item));
      setNotice("Test message accepted by Meta. Confirm its content before activation.");
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Activation test could not be sent."); }
    finally { setBusy(null); }
  }

  function campaignValues(target: WhatsAppTemplateActivation): Record<string, string> {
    return Object.values(target.field_mappings).reduce<Record<string, string>>((values, source) => {
      if (source.startsWith("campaign.")) {
        const key = source.slice("campaign.".length);
        values[key] = campaignInputs[key] || "";
      }
      return values;
    }, {});
  }

  async function activateCurrent() {
    if (!activation) return;
    setBusy("activate");
    setError(null);
    try {
      const response = await fetch(`${base}/template-activations/${encodeURIComponent(activation.activation_id)}/activate`, { method: "POST", headers: mutationHeaders(csrfToken) });
      if (!response.ok) throw new Error(await responseError(response, "Template activation could not be activated."));
      const active = await response.json() as WhatsAppTemplateActivation;
      setActivation(active);
      await load();
      setNotice("Template activation is ready for campaigns.");
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Template activation could not be activated."); }
    finally { setBusy(null); }
  }

  async function createCampaign(event: React.FormEvent) {
    event.preventDefault();
    const active = activations.find((item) => item.status === "active" && item.template_record_id === templateId)
      || activations.find((item) => item.status === "active");
    if (!active) { setError("Activate a tested marketing template first."); return; }
    setBusy("campaign");
    setError(null);
    try {
      const campaignId = `campaign_${new Date().toISOString().replace(/\D/g, "").slice(0, 14)}_${crypto.randomUUID().slice(0, 6)}`;
      const response = await fetch(`${base}/marketing-campaigns`, {
        method: "POST",
        headers: mutationHeaders(csrfToken),
        body: JSON.stringify({
          campaign_id: campaignId,
          campaign_name: campaignName,
          activation_id: active.activation_id,
          audience_mode: audienceMode,
          contact_ids: audienceMode === "selected" ? selectedContacts : [],
          segment_id: audienceMode === "segment" ? segmentId : null,
          campaign_values: campaignValues(active),
          starts_at: startsAt ? new Date(startsAt).toISOString() : null,
          ends_at: endsAt ? new Date(endsAt).toISOString() : null,
          timezone: "Africa/Nairobi",
          allowed_send_start: "08:00",
          allowed_send_end: "18:00",
          recipient_limit: recipientLimit,
          delay_seconds: 1,
          daily_frequency_cap: 2,
        }),
      });
      if (!response.ok) throw new Error(await responseError(response, "Campaign could not be created."));
      const campaign = await response.json() as WhatsAppMarketingCampaign;
      setCampaigns((current) => [campaign, ...current]);
      setNotice(`Campaign prepared with ${campaign.summary.eligible} eligible recipients. Review it, then schedule.`);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Campaign could not be created."); }
    finally { setBusy(null); }
  }

  async function scheduleCampaign(campaignId: string) {
    setBusy(campaignId);
    setError(null);
    try {
      const response = await fetch(`${base}/marketing-campaigns/${encodeURIComponent(campaignId)}/schedule`, { method: "POST", headers: mutationHeaders(csrfToken) });
      if (!response.ok) throw new Error(await responseError(response, "Campaign could not be scheduled."));
      await load();
      setNotice("Campaign scheduled. Consent and eligibility will be checked again before every send.");
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Campaign could not be scheduled."); }
    finally { setBusy(null); }
  }

  if (!canManage) return <p className="permission-message">A channel administrator must activate templates and schedule campaigns.</p>;

  const activeCampaignActivation = activations.find((item) => item.status === "active" && item.template_record_id === templateId)
    || activations.find((item) => item.status === "active");
  const campaignFieldKeys = activeCampaignActivation
    ? [...new Set(Object.values(activeCampaignActivation.field_mappings)
      .filter((source) => source.startsWith("campaign."))
      .map((source) => source.slice("campaign.".length)))]
    : [];

  return <div className="campaign-stack">
    {error ? <div className="inline-error"><AlertTriangle size={16} />{error}</div> : null}
    {notice ? <div className="inline-success"><CheckCircle2 size={16} />{notice}</div> : null}
    <form className="whatsapp-form" onSubmit={saveActivation}>
      <div className="section-heading"><div><h2>Activate a marketing template</h2><p>Map personalization and route quick replies before campaign use.</p></div><CheckCircle2 size={18} /></div>
      <div className="whatsapp-form-grid"><label>Approved template<select onChange={(event) => chooseTemplate(event.target.value)} required value={templateId}><option value="">Select template</option>{marketingTemplates.map((template) => <option key={template.template_record_id} value={template.template_record_id}>{template.name}</option>)}</select></label><label>Consent purpose<input onChange={(event) => setPurpose(event.target.value)} required value={purpose} /></label></div>
      {fields.map((field, index) => {
        const campaignKey = field.key.replace(/[^a-z0-9]+/gi, "_").toLowerCase();
        return <div className="activation-field" key={field.key}><div><strong>{field.label}</strong><small>{field.key} / {field.value_type}</small></div>{field.value_type === "quick_reply" ? <><label>Action key<input onChange={(event) => setMappingValues((current) => ({ ...current, [field.key]: event.target.value }))} value={mappingValues[field.key] || suggestedAction(field.label, index).action} /></label><label>Workspace skill route<input onChange={(event) => setRouteValues((current) => ({ ...current, [field.key]: event.target.value }))} placeholder="professional.service_discovery" value={routeValues[field.key] || ""} /></label></> : <><label>Value source<select onChange={(event) => setMappingModes((current) => ({ ...current, [field.key]: event.target.value }))} value={mappingModes[field.key] || "campaign"}><option value="contact.preferred_name">Contact preferred name</option><option value="contact.display_name">Contact display name</option><option value="contact.first_name">Contact first name</option><option value="campaign">Campaign value</option><option value="static">Fixed value</option></select></label>{mappingModes[field.key] === "static" ? <label>Fixed value<input onChange={(event) => setMappingValues((current) => ({ ...current, [field.key]: event.target.value }))} value={mappingValues[field.key] || ""} /></label> : null}{mappingModes[field.key] === "campaign" ? <label>Test value<input onChange={(event) => setCampaignInputs((current) => ({ ...current, [campaignKey]: event.target.value }))} value={campaignInputs[campaignKey] || ""} /></label> : null}</>}</div>;
      })}
      <p className="field-help">The View services action uses <strong>professional.service_discovery</strong>, which lists this workspace&apos;s enabled Front Desk, Service Desk, and Back Office capabilities. Book demo routes to <strong>professional.appointment_booking</strong>.</p>
      <div className="whatsapp-form-actions"><button className="duka-button duka-button--secondary" disabled={busy === "activation" || !templateId} type="submit"><Save size={15} />Validate activation</button></div>
    </form>
    {activation ? <div className="activation-test"><div><strong>Activation v{activation.activation_version}</strong><StatusBadge tone={statusTone(activation.status)}>{activation.status}</StatusBadge>{activation.validation_errors.map((issue, index) => <small className="danger-text" key={index}>{issue.message}</small>)}</div><label>Test contact<select onChange={(event) => setTestContact(event.target.value)} value={testContact}><option value="">Select consented contact</option>{contacts.map((contact) => <option key={contact.contact_id} value={contact.contact_id}>{contactLabel(contact)} / {contact.display_phone_number}</option>)}</select></label><button className="duka-button duka-button--secondary" disabled={busy === "test" || !testContact || activation.validation_errors.length > 0} onClick={() => void testActivation()} type="button"><Send size={15} />Send test</button><button className="duka-button duka-button--primary" disabled={busy === "activate" || activation.status !== "tested"} onClick={() => void activateCurrent()} type="button"><CheckCircle2 size={15} />Activate</button></div> : null}
    <form className="whatsapp-form" onSubmit={createCampaign}>
      <div className="section-heading"><div><h2>Prepare campaign</h2><p>Select specific contacts, a reusable category segment, or all eligible contacts.</p></div><Megaphone size={18} /></div>
      <div className="whatsapp-form-grid"><label>Campaign name<input onChange={(event) => setCampaignName(event.target.value)} required value={campaignName} /></label><label>Active template<select onChange={(event) => setTemplateId(event.target.value)} required value={templateId}><option value="">Select active template</option>{activations.filter((item) => item.status === "active").map((item) => <option key={item.activation_id} value={item.template_record_id}>{item.template_name || item.template_record_id} / v{item.activation_version}</option>)}</select></label></div>
      <fieldset className="whatsapp-segmented"><legend>Audience</legend>{(["selected", "segment", "all_eligible"] as AudienceMode[]).map((mode) => <button className={audienceMode === mode ? "is-active" : ""} key={mode} onClick={() => setAudienceMode(mode)} type="button">{mode.replace("_", " ")}</button>)}</fieldset>
      {audienceMode === "selected" ? <fieldset className="contact-picker"><legend>Contacts</legend>{contacts.map((contact) => <label key={contact.contact_id}><input checked={selectedContacts.includes(contact.contact_id)} onChange={(event) => setSelectedContacts((current) => event.target.checked ? [...current, contact.contact_id] : current.filter((id) => id !== contact.contact_id))} type="checkbox" />{contactLabel(contact)} <span>{contact.display_phone_number}</span></label>)}</fieldset> : null}
      {audienceMode === "segment" ? <label>Saved segment<select onChange={(event) => setSegmentId(event.target.value)} required value={segmentId}><option value="">Select segment</option>{segments.map((segment) => <option key={segment.segment_id} value={segment.segment_id}>{segment.name} ({segment.eligible_count ?? 0})</option>)}</select></label> : null}
      {audienceMode === "all_eligible" ? <div className="inline-warning"><AlertTriangle size={16} />All active contacts will still be filtered by the activation&apos;s consent purpose, suppression rules, personalization, and frequency cap.</div> : null}
      {campaignFieldKeys.length ? <div className="whatsapp-form-grid">{campaignFieldKeys.map((key) => <label key={key}>{key.replaceAll("_", " ")}<input onChange={(event) => setCampaignInputs((current) => ({ ...current, [key]: event.target.value }))} required value={campaignInputs[key] || ""} /></label>)}</div> : null}
      <div className="whatsapp-form-grid"><label>Start at <span>Optional</span><input onChange={(event) => setStartsAt(event.target.value)} type="datetime-local" value={startsAt} /></label><label>End at <span>Optional</span><input onChange={(event) => setEndsAt(event.target.value)} type="datetime-local" value={endsAt} /></label><label>Recipient limit<input min="1" onChange={(event) => setRecipientLimit(Number(event.target.value))} type="number" value={recipientLimit} /></label></div>
      <div className="whatsapp-form-actions"><button className="duka-button duka-button--primary" disabled={busy === "campaign"} type="submit"><Megaphone size={15} />Prepare campaign</button></div>
    </form>
    <div className="operations-table operations-table--campaigns"><div className="operations-table__header"><span>Campaign</span><span>Audience</span><span>Status</span><span>Evidence</span><span>Action</span></div>{campaigns.map((campaign) => <div className="operations-table__row" key={campaign.campaign_id}><div><strong>{campaign.campaign_name}</strong><small>{campaign.campaign_id}</small></div><span>{campaign.audience_mode.replace("_", " ")}</span><StatusBadge tone={statusTone(campaign.status)}>{campaign.status}</StatusBadge><div><strong>{campaign.summary.eligible} eligible / {campaign.summary.sent} sent</strong><small>{campaign.summary.skipped} skipped / {campaign.summary.failed} failed</small></div><div>{campaign.status === "draft" ? <button className="duka-button duka-button--primary" disabled={busy === campaign.campaign_id} onClick={() => void scheduleCampaign(campaign.campaign_id)} type="button">Schedule</button> : null}</div></div>)}{!campaigns.length ? <p className="operations-empty">No marketing campaigns have been prepared.</p> : null}</div>
  </div>;
}
