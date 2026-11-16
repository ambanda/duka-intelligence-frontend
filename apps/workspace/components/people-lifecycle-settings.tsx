"use client";

import { useState, type FormEvent } from "react";
import { Save } from "lucide-react";
import { useOperations, rows, field, type OperationRow as Row } from "./operations-client";

export function PeopleLifecycleSettings({ workspaceSlug, csrfToken }: { workspaceSlug: string; csrfToken: string }) {
  const api = useOperations(workspaceSlug, csrfToken);
  const [rules, setRules] = useState<Row | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  async function load() { try { setRules(await api("lifecycle-rules")); } catch (e) { setError(String(e)); } }
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(""); setNotice("");
    const form = new FormData(event.currentTarget);
    try { setRules(await api("lifecycle-rules", "PUT", { order_threshold: form.get("order"), appointment_threshold: form.get("appointment"), expected_version: rules?.version || 0 })); setNotice("Conversion rules saved."); }
    catch (e) { setError(e instanceof Error ? e.message : String(e)); }
    finally { setBusy(false); }
  }
  return <details onToggle={(e) => { if (e.currentTarget.open && !rules) void load(); }}><summary>Relationship conversion rules</summary>
    {error && <p role="alert" className="error-state">{error}</p>}{notice && <p role="status">{notice}</p>}
    {rules && <form className="knowledge-form" onSubmit={save} key={String(rules.version)}><label>Order becomes customer<select name="order" defaultValue={String(rules.order_threshold)}><option value="automatic">Accepted order, or collected payment when required</option><option value="finalized">Order finalized</option><option value="paid">Payment collected</option><option value="completed">Order completed</option></select></label><label>Appointment becomes customer<select name="appointment" defaultValue={String(rules.appointment_threshold)}><option value="confirmed">Appointment confirmed</option><option value="completed">Appointment completed</option><option value="disabled">No automatic conversion</option></select></label><button className="duka-button duka-button--primary" disabled={busy}><Save size={16} />Save rules</button></form>}
    {rules && <><h3>Lifecycle events requiring review</h3><div className="knowledge-scroll"><table><thead><tr><th>Event</th><th>Reference</th><th>Status</th><th>Attempts</th><th>Error</th></tr></thead><tbody>{rows(rules.attention_events).map((event) => <tr key={field(event, "event_id")}><td>{field(event, "event_type")}</td><td className="reference-text">{field(event, "subject_reference")}</td><td>{field(event, "status")}</td><td>{field(event, "attempts")}</td><td>{field(event, "error_summary") || "-"}</td></tr>)}</tbody></table>{!rows(rules.attention_events).length && <p>No lifecycle events require review.</p>}</div></>}
  </details>;
}
