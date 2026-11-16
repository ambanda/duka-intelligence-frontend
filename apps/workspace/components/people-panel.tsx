"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { Plus, Save, Send, RefreshCw, Search, UserRound, Link2 } from "lucide-react";
import { useOperations, field, rows, labels, type OperationRow as Row } from "./operations-client";
import { PeopleContactDialog } from "./people-contact-dialog";
import { PeopleLifecycleSettings } from "./people-lifecycle-settings";

const split = (value: FormDataEntryValue | null) => String(value || "").split(",").map((s) => s.trim()).filter(Boolean);

export function PeoplePanel({ workspaceSlug, csrfToken }: { workspaceSlug: string; csrfToken: string }) {
  const api = useOperations(workspaceSlug, csrfToken);
  const [contacts, setContacts] = useState<Row[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [staff, setStaff] = useState<Row[]>([]);
  const [channels, setChannels] = useState<Row[]>([]);
  const [cursor, setCursor] = useState("");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [person, setPerson] = useState<Row | null>(null);
  const [editing, setEditing] = useState(false);
  const [sender, setSender] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const loadEpoch = useRef(0);
  const load = useCallback(async (after = "") => {
    const epoch = ++loadEpoch.current;
    const result = await api(`people?search=${encodeURIComponent(search)}&after=${encodeURIComponent(after)}&relationship=${tab === "all" ? "" : tab}`);
    if (epoch !== loadEpoch.current) return;
    setContacts((old) => after ? [...old, ...rows(result.contacts)] : rows(result.contacts));
    setCursor(String(result.next_cursor || ""));
    setCategories(labels(result.categories));
    setStaff(rows(result.staff));
  }, [api, search, tab]);
  useEffect(() => { void load().catch((e) => setError(String(e))); }, [load]);
  useEffect(() => {
    const refresh = () => { if (document.visibilityState === "visible") void load().catch((e) => setError(String(e))); };
    window.addEventListener("focus", refresh); document.addEventListener("visibilitychange", refresh);
    return () => { window.removeEventListener("focus", refresh); document.removeEventListener("visibilitychange", refresh); };
  }, [load]);
  useEffect(() => { void api("channels").then((r) => setChannels(rows(r.channels))).catch((e) => setError(String(e))); }, [api]);
  useEffect(() => {
    const contact = new URL(window.location.href).searchParams.get("contact");
    if (contact) void api(`people/${encodeURIComponent(contact)}`).then(setPerson).catch((e) => setError(String(e)));
  }, [api]);
  async function run(operation: () => Promise<unknown>) {
    setError(""); setNotice(""); setBusy(true);
    try { await operation(); await load(); } catch (e) { setError(e instanceof Error ? e.message : String(e)); }
    finally { setBusy(false); }
  }
  function reachability(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget);
    void run(async () => {
      const consent = form.get("consent") === "on" ? {
        confirmed: true, source: form.get("source"), purposes: split(form.get("purposes")), evidence_reference: form.get("evidence"),
        policy_version: form.get("policy"), consented_at: new Date(String(form.get("consented_at"))).toISOString(),
        consent_expires_at: form.get("expires_at") ? new Date(String(form.get("expires_at"))).toISOString() : null,
      } : null;
      setPerson(await api(`people/${field(person!, "contact_id")}/reachability`, "POST", {
        channel_id: form.get("channel"), phone_number_e164: form.get("phone"), marketing_consent: consent,
      }));
    });
  }
  function access(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget);
    void run(async () => {
      const result = await api(`people/${field(person!, "contact_id")}/access`, "POST", {
        principal_id: form.get("principal"), phone_number_e164: form.get("phone"), role: form.get("role"),
        permission_set: form.get("permission"), service_centres: form.getAll("centre"),
      });
      setNotice(`${result.principal_id}: ${result.auth0_action}`);
      setPerson(await api(`people/${field(person!, "contact_id")}`));
    });
  }
  const visible = contacts.filter((row) => tab === "all" || labels(row.relationships).includes(tab));
  const activeChannels = channels.filter((c) => c.status === "active" && c.transport_type === "meta_cloud_api");
  const senderId = sender || (activeChannels.length === 1 ? field(activeChannels[0], "channel_id") : "");
  return <div className="people-panel">
    <div className="knowledge-toolbar"><div role="tablist" aria-label="People views">{["all", "prospect", "customer", "member", "staff"].map((key) => <button key={key} role="tab" aria-selected={tab === key} onClick={() => setTab(key)}>{key === "all" ? "All contacts" : key === "staff" ? "Staff" : `${key[0].toUpperCase()}${key.slice(1)}s`}</button>)}</div>
      <div className="people-send-actions"><button className="icon-button" title="Refresh contacts" aria-label="Refresh contacts" onClick={() => void run(() => load())}><RefreshCw size={18} /></button><label>Channel<select name="sender" value={senderId} onChange={(e) => setSender(e.target.value)}><option value="">Select channel</option>{activeChannels.map((c) => <option key={field(c, "channel_id")} value={field(c, "channel_id")}>{field(c, "display_name") || field(c, "bot_phone_number")}</option>)}</select></label><button className="duka-button duka-button--secondary" disabled={!senderId || !selected.length} onClick={() => window.location.assign(`/w/${encodeURIComponent(workspaceSlug)}/channels/${encodeURIComponent(senderId)}?panel=messages&contacts=${encodeURIComponent(selected.join(","))}`)}><Send size={16} />Send template ({selected.length})</button><button className="duka-button duka-button--primary" onClick={() => { setPerson(null); setEditing(true); }}><Plus size={16} />Add contact</button></div>
    </div>
    {error && <p role="alert" className="error-state">{error}</p>}{notice && <p role="status">{notice}</p>}
    <label className="people-search"><Search size={17} /><input name="contact-search" aria-label="Find contact" placeholder="Name or channel identity" value={search} onChange={(e) => setSearch(e.target.value)} /></label>
    <div className="knowledge-scroll"><table><thead><tr><th>Select</th><th>Contact</th><th>Relationship</th><th>Tags / sources</th><th>Reachability</th><th>Status</th></tr></thead><tbody>{visible.map((row) => <tr key={field(row, "contact_id")}>
      <td><input type="checkbox" aria-label={`Select ${field(row, "display_name")}`} checked={selected.includes(field(row, "contact_id"))} onChange={(e) => setSelected((old) => e.target.checked ? [...old, field(row, "contact_id")] : old.filter((id) => id !== row.contact_id))} /></td>
      <td><button className="duka-button duka-button--quiet" onClick={() => void run(async () => { setPerson(await api(`people/${field(row, "contact_id")}`)); setEditing(false); })}><UserRound size={16} />{field(row, "display_name") || "Unnamed contact"}</button><small className="reference-text">{field(row, "contact_id")}</small></td>
      <td>{labels(row.relationships).join(", ")}</td><td>{labels(row.categories).map((key) => <span className="people-tag" key={key}>{key.replaceAll("_", " ")}</span>)}{labels(row.entry_sources).map((key) => <span className="people-tag people-tag--source" key={key}>Source: {key.replaceAll("_", " ")}</span>)}</td><td>{rows(row.identities).map((i) => <div key={field(i, "identity_id")}>{field(i, "channel_type")}: {field(i, "provider_identity")}</div>)}</td><td>{row.do_not_contact ? "Do not contact" : field(row, "status")}</td>
    </tr>)}</tbody></table>{!visible.length && <p>No matching contacts.</p>}</div>
    {cursor && <button className="duka-button duka-button--secondary" onClick={() => void run(() => load(cursor))}>Load more</button>}
    {tab === "staff" && <section className="operational-section"><h2>Authorized workspace assignments</h2><EvidenceTable records={staff} columns={["display_name", "principal_id", "phone_number_e164", "role", "permission_set", "contact_id"]} /></section>}
    {editing && <PeopleContactDialog workspaceSlug={workspaceSlug} csrfToken={csrfToken} person={person} channels={channels} categories={categories} onClose={() => setEditing(false)} onSaved={(saved) => { setPerson(saved); setEditing(false); setTab("all"); setSearch(""); void run(() => load()); }} />}
    {person && !editing && <section className="operational-section" id="contact-detail"><div className="knowledge-toolbar"><h2>{field(person, "display_name")}</h2><div><button className="duka-button duka-button--secondary" onClick={() => setEditing(true)}>Edit contact</button><button className="duka-button duka-button--quiet" onClick={() => setPerson(null)}>Close</button></div></div>
      <a className="reference-text" href={`?contact=${encodeURIComponent(field(person, "contact_id"))}`}><Link2 size={14} />{field(person, "contact_id")}</a>
      <h3>Channel identities</h3><EvidenceTable records={rows(person.identities)} columns={["channel_id", "provider_identity", "verification_status"]} />
      <details><summary>Add channel identity / record consent</summary><form className="knowledge-form" onSubmit={reachability}>
        <label>Channel<select name="channel" required>{channels.filter((c) => c.status === "active" && c.transport_type === "meta_cloud_api").map((c) => <option key={field(c, "channel_id")} value={field(c, "channel_id")}>{field(c, "display_name")} {field(c, "bot_phone_number")}</option>)}</select></label><label>Phone (E.164)<input name="phone" type="tel" required placeholder="+254..." /></label>
        <label><input name="consent" type="checkbox" />I hold evidence of explicit marketing permission</label><label>Consent source<select name="source"><option value="offline_form">Offline form</option><option value="website_form">Website form</option><option value="recorded_conversation">Recorded conversation</option></select></label>
        <label>Purposes<input name="purposes" defaultValue="all_marketing" /></label><label>Evidence reference<input name="evidence" /></label><label>Consent wording / policy version<input name="policy" /></label><label>Consented at<input name="consented_at" type="datetime-local" /></label><label>Expires at<input name="expires_at" type="datetime-local" /></label><button className="duka-button duka-button--primary" disabled={busy}><Save size={16} />Save identity</button>
      </form></details>
      <h3>Consent evidence</h3><EvidenceTable records={rows(person.consent_events)} columns={["event_type", "channel_id", "purpose", "evidence_reference", "policy_version", "occurred_at"]} />
      <h3>First discovery</h3><EvidenceTable records={person.first_touch ? [person.first_touch as Row] : []} columns={["origin_type", "entry_point_id", "campaign_id", "started_at"]} />
      <h3>Customer journey</h3><EvidenceTable records={rows(person.journeys)} columns={["journey_id", "origin_type", "entry_point_id", "campaign_id", "status", "conversion_type", "conversion_reference", "started_at"]} />
      <h3>Relationship history</h3><EvidenceTable records={rows(person.relationship_history)} columns={["previous_relationships", "relationships", "event_type", "subject_reference", "rule_version", "actor_principal_id", "occurred_at"]} />
      <h3>Business outcomes</h3><EvidenceTable records={rows(person.lifecycle_events)} columns={["event_type", "subject_reference", "status", "journey_id", "occurred_at"]} />
      <h3>Outreach</h3><EvidenceTable records={rows(person.outreach)} columns={["journey_reference", "journey_id", "dispatch_id", "business_reference", "delivery_status", "eligibility_reason", "error_summary"]} />
      <h3>Journey activity</h3><EvidenceTable records={rows(person.journey_events)} columns={["journey_id", "event_type", "occurred_at"]} />
      <h3>Workspace access</h3><EvidenceTable records={rows(person.access)} columns={["principal_id", "role", "permission_set", "is_active"]} />
      <details><summary>Grant staff access</summary><form className="knowledge-form" onSubmit={access}><label>Principal ID<input name="principal" required /></label><label>Staff phone (E.164)<input name="phone" type="tel" required /></label><label>Role<select name="role"><option value="receptionist">Receptionist</option><option value="manager">Manager</option><option value="admin">Admin</option></select></label><label>Permission set<select name="permission"><option value="read_knowledge">Read knowledge</option><option value="manage_workspace">Manage workspace</option></select></label><fieldset><legend>Operational assignments</legend>{["front_desk", "service_desk", "back_office"].map((c) => <label key={c}><input name="centre" type="checkbox" value={c} />{c.replaceAll("_", " ")}</label>)}</fieldset><button className="duka-button duka-button--primary" disabled={busy}><Save size={16} />Grant access</button></form></details>
    </section>}
    <PeopleLifecycleSettings workspaceSlug={workspaceSlug} csrfToken={csrfToken} />
  </div>;
}

export function EvidenceTable({ records, columns }: { records: Row[]; columns: string[] }) {
  return <div className="knowledge-scroll"><table><thead><tr>{columns.map((c) => <th key={c}>{c.replaceAll("_", " ")}</th>)}</tr></thead><tbody>{records.map((row, index) => <tr key={index}>{columns.map((c) => <td className="reference-text" key={c}>{field(row, c) || "-"}</td>)}</tr>)}</tbody></table>{!records.length && <p>No records.</p>}</div>;
}
