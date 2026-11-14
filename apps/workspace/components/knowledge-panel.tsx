"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { WorkspaceKnowledgeInventory } from "@duka/api-client";
import { Archive, FilePlus2, RefreshCw, Save, Send, History, Pencil, RotateCcw } from "lucide-react";

type Row = Record<string, unknown>;
const text = (row: Row, key: string) => String(row[key] ?? "");

export function KnowledgePanel({ workspaceSlug, csrfToken }: { workspaceSlug: string; csrfToken: string }) {
  const base = `/api/bff/workspaces/${encodeURIComponent(workspaceSlug)}/knowledge`;
  const [data, setData] = useState<WorkspaceKnowledgeInventory | null>(null);
  const [tab, setTab] = useState("objects");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [objectId, setObjectId] = useState("");
  const [collection, setCollection] = useState("");
  const [audience, setAudience] = useState("public");
  const [advanced, setAdvanced] = useState(false);
  const [kind, setKind] = useState("common.business_profile");
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [version, setVersion] = useState(0);
  const [dirty, setDirty] = useState(false);
  const [history, setHistory] = useState<Row[]>([]);

  const request = useCallback(async (path = "", method = "GET", body?: unknown) => {
    const response = await fetch(`${base}${path}`, {
      method, cache: "no-store",
      headers: { "Content-Type": "application/json", "x-duka-csrf": csrfToken },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error?.message || "Knowledge could not be loaded.");
    return result;
  }, [base, csrfToken]);
  const load = useCallback(async () => {
    try { setData(await request()); } catch (reason) { setError(String(reason)); }
  }, [request]);
  useEffect(() => { void load(); }, [load]);

  async function run(operation: () => Promise<unknown>) {
    setBusy(true); setError("");
    try { await operation(); await load(); } catch (reason) { setError(reason instanceof Error ? reason.message : "The operation failed."); }
    finally { setBusy(false); }
  }
  function editDraft(row: Row) {
    const item = row.object_json as Row;
    const payload = item.payload as Row;
    setObjectId(text(row, "knowledge_object_id")); setCollection(text(row, "collection_key"));
    setKind(text(item, "type")); setName(text(item, "display_name"));
    setAudience(text(item, "access_scope") || (item.visibility === "public" ? "public" : "workspace"));
    setQuestion(text(payload, "question"));
    setAnswer(text(payload, "answer") || text(payload, "introduction") || text(payload, "description") || text(payload, "content"));
    setVersion(Number(row.draft_version)); setDirty(false); setTab("editor");
  }
  function useRevision(row: Row) {
    const aliases: Record<string, string> = { business_profile: "common.business_profile", public_faq: "common.public_faq" };
    const objectType = aliases[text(row, "knowledge_object_type")] || text(row, "knowledge_object_type");
    const target = data?.collections.find((entry) => entry.knowledge_collection_id === row.knowledge_collection_id);
    if (!target || !["common.business_profile", "common.public_faq", "common.booking_policy", "common.operating_document"].includes(objectType)) {
      throw new Error("This content is maintained by its connected source.");
    }
    editDraft({ knowledge_object_id: row.knowledge_object_id, collection_key: target.collection_key,
      draft_version: 0, object_json: { type: objectType, display_name: row.display_name, payload: row.object_payload, access_scope: row.access_scope, visibility: row.visibility } });
    setDirty(true); setHistory([]);
  }
  async function save(event: FormEvent) {
    event.preventDefault();
    await run(async () => {
      const payload = kind === "common.public_faq" ? { question, answer }
        : kind === "common.business_profile" ? { introduction: answer } : kind === "common.operating_document" ? { content: answer } : { description: answer };
      const result = collection ? await request(`/objects/${encodeURIComponent(objectId)}/draft`, "PUT", {
        collection_key: collection, expected_version: version,
        object: { type: kind, display_name: name, payload, visibility: audience === "public" ? "public" : "internal", data_classification: audience === "public" ? "public" : "internal", access_scope: audience },
      }) : await (async () => {
        const response = await fetch(`/api/bff/workspaces/${encodeURIComponent(workspaceSlug)}/operations/content`, {
          method: "POST", headers: { "Content-Type": "application/json", "x-duka-csrf": csrfToken },
          body: JSON.stringify({ object_id: objectId, object_type: kind, title: name, audience, payload, expected_version: version }),
        });
        const body = await response.json(); if (!response.ok) throw new Error(body.error?.message || "Content could not be saved");
        setCollection(body.collection_key); return body;
      })();
      setVersion(result.draft_version);
      setDirty(false);
    });
  }
  async function configure(event: FormEvent<HTMLFormElement>, operation: string) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    await run(async () => {
      if (operation === "collections") {
        await request(`/collections/${encodeURIComponent(String(values.key))}`, "PUT", { display_name: values.name, visibility: "public", publication_status: "published" });
      } else if (operation === "bindings") {
        await request("/bindings", "PUT", { skill_id: values.skill, content_slot: values.slot, source_kind: "knowledge_collection", source_reference: values.collection });
      } else {
        await request(`/sources/${encodeURIComponent(String(values.key))}`, "PUT", {
          display_name: values.name, source_type: values.type, source_mode: "synchronized",
          connection_secret_ref: values.secret || null, config: { collection_key: values.collection }, status: "active",
        });
      }
    });
  }
  const objectRows = data?.objects || [];
  return <div className="knowledge-panel">
    <div className="knowledge-toolbar"><div role="tablist" aria-label="Knowledge views">
      {[['objects', 'Published'], ['drafts', 'Drafts'], ['events', 'Activity'], ...(advanced ? [['collections', 'Collections'], ['bindings', 'Skill bindings']] : [])].map(([key, label]) => <button role="tab" aria-selected={tab === key} key={key} onClick={() => setTab(key)}>{label}</button>)}
    </div><div><button className="icon-button" title="Refresh knowledge" aria-label="Refresh knowledge" onClick={load} disabled={busy}><RefreshCw size={18} /></button>
      <button className="duka-button duka-button--primary" onClick={() => { setObjectId(`knowledge_${crypto.randomUUID()}`); setCollection(""); setName(""); setQuestion(""); setAnswer(""); setVersion(0); setTab("editor"); }}><FilePlus2 size={16} />New content</button></div></div>
    <div className="knowledge-actions"><label><input type="checkbox" checked={advanced} onChange={(e) => { setAdvanced(e.target.checked); setTab("objects"); }} />Advanced settings</label><a href={`/w/${encodeURIComponent(workspaceSlug)}/data-sources`}>Data sources</a></div>
    {error && <p role="alert" className="error-state">{error}</p>}
    {!data && !error && <p role="status">Loading knowledge...</p>}
    {tab === "editor" && <form className="knowledge-form" onSubmit={save} onChange={() => setDirty(true)}>
      <label>Content type<select name="content_type" value={kind} disabled={version > 0} onChange={(e) => { setKind(e.target.value); setCollection(""); setAudience(e.target.value === "common.operating_document" ? "workspace" : "public"); }}><option value="common.business_profile">Business introduction</option><option value="common.public_faq">FAQ</option><option value="common.booking_policy">Booking policy</option><option value="common.operating_document">Staff document</option></select></label>
      <label>Audience<select name="audience" value={audience} disabled={version > 0} onChange={(e) => { setAudience(e.target.value); setCollection(""); }}><option value="public" disabled={kind === "common.operating_document"}>Public customers</option><option value="workspace" disabled={["common.business_profile", "common.public_faq"].includes(kind)}>Authorized workspace staff</option></select></label>
      <label>Title<input name="title" value={name} onChange={(e) => setName(e.target.value)} required maxLength={200} /></label>
      {kind === "common.public_faq" && <label>Question<input name="question" value={question} onChange={(e) => setQuestion(e.target.value)} required maxLength={1000} /></label>}
      <label>{kind === "common.public_faq" ? "Answer" : "Content"}<textarea name="content" rows={7} value={answer} onChange={(e) => setAnswer(e.target.value)} required maxLength={10000} /></label>
      <div className="knowledge-actions"><button className="duka-button duka-button--secondary" disabled={busy}><Save size={16} />Save draft</button>
        <button type="button" className="duka-button duka-button--primary" disabled={busy || version === 0 || dirty} onClick={() => run(async () => { await request(`/objects/${encodeURIComponent(objectId)}/publish`, "POST", { expected_version: version }); setTab("objects"); setVersion(0); })}><Send size={16} />Publish saved draft</button></div>
    </form>}
    {tab === "objects" && <div className="knowledge-scroll"><table><thead><tr><th>Content</th><th>Type</th><th>Status</th><th>Revision</th><th>Actions</th></tr></thead><tbody>{objectRows.map((row) => <tr key={text(row, "knowledge_object_id")}><td>{text(row, "display_name")}</td><td>{text(row, "knowledge_object_type")}</td><td>{text(row, "publication_status")}</td><td>{text(row, "revision_number")}</td><td><button className="icon-button" aria-label="Edit content" title="Edit content" disabled={busy} onClick={() => run(async () => { const revisions = await request(`/objects/${encodeURIComponent(text(row, "knowledge_object_id"))}/revisions`); if (revisions[0]) useRevision(revisions[0]); })}><Pencil size={17} /></button><button className="icon-button" aria-label="View revision history" title="Revision history" onClick={() => run(async () => setHistory(await request(`/objects/${encodeURIComponent(text(row, "knowledge_object_id"))}/revisions`)))}><History size={17} /></button><button className="icon-button" title="Archive content" aria-label="Archive content" disabled={busy} onClick={() => run(() => request(`/objects/${encodeURIComponent(text(row, "knowledge_object_id"))}/archive`, "POST", {}))}><Archive size={17} /></button></td></tr>)}</tbody></table>{!objectRows.length && <p>No published content.</p>}</div>}
    {tab === "drafts" && <div className="readiness-list">{data?.drafts.map((row) => <div key={text(row, "knowledge_object_id")}><span>{String((row.object_json as Row).display_name || row.knowledge_object_id)}</span><button className="duka-button duka-button--secondary" onClick={() => editDraft(row)}>Edit draft</button></div>)}{!data?.drafts.length && <p>No drafts.</p>}</div>}
    {tab === "collections" && <><DataTable rows={data?.collections || []} columns={['collection_key', 'display_name', 'visibility', 'publication_status']} /><form className="knowledge-form" onSubmit={(e) => configure(e, "collections")}><h2>New collection</h2><label>Collection key<input name="key" required /></label><label>Name<input name="name" required /></label><button className="duka-button duka-button--primary" disabled={busy}><Save size={16} />Save collection</button></form></>}
    {tab === "bindings" && <><DataTable rows={data?.bindings || []} columns={['skill_id', 'content_slot', 'source_kind', 'source_reference', 'status']} /><form className="knowledge-form" onSubmit={(e) => configure(e, "bindings")}><h2>Add content to a skill</h2><label>Skill<input name="skill" required placeholder="common.public_faq" /></label><label>Content slot<input name="slot" required placeholder="faqs" /></label><label>Collection<select name="collection" required>{data?.collections.map((row) => <option key={text(row, "collection_key")} value={text(row, "collection_key")}>{text(row, "display_name")}</option>)}</select></label><button className="duka-button duka-button--primary" disabled={busy}><Save size={16} />Add binding</button></form></>}
    {tab === "sources" && <><DataTable rows={data?.sources || []} columns={['display_name', 'source_type', 'status', 'last_sync_status', 'active_objects', 'stale_objects']} /><form className="knowledge-form" onSubmit={(e) => configure(e, "sources")}><h2>Connect approved source</h2><label>Source key<input name="key" required /></label><label>Name<input name="name" required /></label><label>Connector<input name="type" required /></label><label>Credential reference<input name="secret" /></label><label>Collection<select name="collection" required>{data?.collections.map((row) => <option key={text(row, "collection_key")} value={text(row, "collection_key")}>{text(row, "display_name")}</option>)}</select></label><button className="duka-button duka-button--primary" disabled={busy}><Save size={16} />Save source</button></form></>}
    {tab === "events" && <DataTable rows={data?.events || []} columns={['occurred_at', 'event_type', 'knowledge_object_id', 'revision_number']} />}
    {history.length > 0 && <section className="operational-section"><h2>Revision history</h2><DataTable rows={history} columns={['revision_number', 'display_name', 'publication_status', 'approved_at']} /><div className="knowledge-actions">{history.map((row) => <button key={text(row, "revision_number")} className="duka-button duka-button--secondary" onClick={() => run(async () => useRevision(row))}><RotateCcw size={16} />Restore revision {text(row, "revision_number")}</button>)}</div><button className="duka-button duka-button--quiet" onClick={() => setHistory([])}>Close history</button></section>}
  </div>;
}

function DataTable({ rows, columns }: { rows: Row[]; columns: string[] }) {
  return <div className="knowledge-scroll"><table><thead><tr>{columns.map((key) => <th key={key}>{key.replaceAll("_", " ")}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{columns.map((key) => <td key={key}>{text(row, key) || "-"}</td>)}</tr>)}</tbody></table>{!rows.length && <p>No records.</p>}</div>;
}
