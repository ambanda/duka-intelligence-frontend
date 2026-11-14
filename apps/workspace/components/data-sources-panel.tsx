"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Save, RefreshCw, Pause, Play, PlugZap } from "lucide-react";
import { useOperations, field, rows, labels, type OperationRow as Row } from "./operations-client";

export function DataSourcesPanel({ workspaceSlug, csrfToken }: { workspaceSlug: string; csrfToken: string }) {
  const api = useOperations(workspaceSlug, csrfToken);
  const [data, setData] = useState<Row>({});
  const [mode, setMode] = useState("managed");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const load = useCallback(async () => setData(await api("data-sources")), [api]);
  useEffect(() => { void load().catch((e) => setError(String(e))); }, [load]);
  async function run(operation: () => Promise<Row | void>) { setBusy(true); setError(""); setNotice(""); try { const result = await operation(); if (result?.detail) setNotice(String(result.detail)); else if (result?.status) setNotice(String(result.status)); await load(); } catch (e) { setError(e instanceof Error ? e.message : String(e)); } finally { setBusy(false); } }
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget);
    void run(() => api(`data-sources/${encodeURIComponent(String(form.get("key")))}`, "PUT", {
      display_name: form.get("name"), source_type: form.get("connector"), source_mode: mode,
      sync_schedule: form.get("schedule") || null, connection_secret_ref: form.get("credential") || null,
      config: form.get("collection") ? { collection_key: form.get("collection") } : {}, status: "active",
    }));
  }
  return <div><div className="knowledge-toolbar"><div role="tablist" aria-label="Source modes">{["managed", "synchronized", "federated"].map((m) => <button key={m} role="tab" aria-selected={mode === m} onClick={() => setMode(m)}>{m[0].toUpperCase() + m.slice(1)}</button>)}</div><button className="icon-button" title="Refresh sources" aria-label="Refresh sources" onClick={() => void run(load)}><RefreshCw size={18} /></button></div>
    {error && <p className="error-state" role="alert">{error}</p>}{notice && <p role="status">{notice}</p>}
    <div className="knowledge-scroll"><table><thead><tr><th>Source</th><th>Connector</th><th>Status</th><th>Last sync</th><th>Freshness</th><th>Actions</th></tr></thead><tbody>{rows(data.sources).filter((s) => s.source_mode === mode).map((s) => <tr key={field(s, "knowledge_source_id")}><td>{field(s, "display_name")}</td><td>{field(s, "source_type")}</td><td>{field(s, "status")}<p role="status">{field(s, "last_error")}</p></td><td>{field(s, "last_sync_status")}<br />{field(s, "last_successful_sync_at")}</td><td>{field(s, "active_objects")} active / {field(s, "stale_objects")} stale</td><td><button className="icon-button" title="Test source" aria-label={`Test ${field(s, "display_name")}`} disabled={busy} onClick={() => void run(() => api(`data-sources/${field(s, "knowledge_source_id")}/test`, "POST", {}))}><PlugZap size={17} /></button>{mode === "synchronized" && <button className="icon-button" title="Synchronize source" aria-label={`Synchronize ${field(s, "display_name")}`} disabled={busy || s.status !== "active"} onClick={() => void run(() => api(`data-sources/${field(s, "knowledge_source_id")}/sync`, "POST", {}))}><RefreshCw size={17} /></button>}<button className="icon-button" title={s.status === "active" ? "Pause source" : "Resume source"} aria-label={s.status === "active" ? "Pause source" : "Resume source"} disabled={busy} onClick={() => void run(() => api(`data-sources/${field(s, "knowledge_source_id")}/${s.status === "active" ? "pause" : "resume"}`, "POST", {}))}>{s.status === "active" ? <Pause size={17} /> : <Play size={17} />}</button></td></tr>)}</tbody></table></div>
    {mode !== "managed" && <section className="operational-section"><h2>Connect source</h2><form className="knowledge-form" key={mode} onSubmit={save}>
      <label>Source key<input name="key" required pattern="[a-zA-Z0-9_.:-]+" /></label><label>Name<input name="name" required /></label>
      <label>Installed connector<select name="connector" required><option value="">Select connector</option>{rows(data.connectors).filter((c) => labels(c.modes).includes(mode)).map((c) => <option key={field(c, "source_type")} value={field(c, "source_type")}>{field(c, "display_name")}</option>)}</select></label>
      <label>Published collection<select name="collection" required={mode === "synchronized"}><option value="">Select collection</option>{rows(data.collections).filter((c) => c.publication_status === "published").map((c) => <option key={field(c, "collection_key")} value={field(c, "collection_key")}>{field(c, "display_name")}</option>)}</select></label>
      <label>Registered credential<select name="credential"><option value="">No credential</option>{[...new Set(rows(data.sources).map((s) => field(s, "connection_secret_ref")).filter(Boolean))].map((ref) => <option key={ref}>{ref}</option>)}</select></label>{mode === "synchronized" && <label>Schedule<input name="schedule" /></label>}
      <button className="duka-button duka-button--primary" disabled={busy}><Save size={16} />Save source</button>
    </form></section>}
  </div>;
}
