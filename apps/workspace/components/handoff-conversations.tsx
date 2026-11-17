"use client";

import type { HandoffActionRequest, HandoffCaseSummary, HandoffConversation } from "@duka/api-client";
import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCheck, CornerUpLeft, Eye, RefreshCw, Send, UserCheck, UserRound, X } from "lucide-react";
import styles from "./handoff-conversations.module.css";

type Props = { workspaceSlug: string; channelId: string; csrfToken: string; initialCase?: string };
const time = (value: string) => new Date(value).toLocaleString();
async function responseJson<T>(response: Response): Promise<T> {
  const body = await response.json();
  if (!response.ok) throw new Error(typeof body.detail === "string" ? body.detail : body.error?.message || "Conversation could not be loaded.");
  return body as T;
}

export function HandoffConversations({ workspaceSlug, channelId, csrfToken, initialCase }: Props) {
  const base = `/api/bff/workspaces/${encodeURIComponent(workspaceSlug)}/channels/${encodeURIComponent(channelId)}/handoffs`;
  const [cases, setCases] = useState<HandoffCaseSummary[]>([]);
  const [selected, setSelected] = useState(initialCase || "");
  const [view, setView] = useState<HandoffConversation | null>(null);
  const [status, setStatus] = useState("open");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState("");
  const [note, setNote] = useState("");
  const [target, setTarget] = useState("");
  const [cancelPending, setCancelPending] = useState(false);
  const selection = useRef(selected);
  selection.current = selected;
  const replyId = useRef<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const result = await responseJson<{ cases: HandoffCaseSummary[] }>(await fetch(`${base}?status=${status}`, { cache: "no-store" }));
      setCases(result.cases);
      setError("");
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Conversations unavailable."); }
    finally { setLoading(false); }
  }, [base, status]);
  const loadCase = useCallback(async (id: string, before?: string) => {
    const result = await responseJson<HandoffConversation>(await fetch(`${base}/${encodeURIComponent(id)}${before ? `?before=${encodeURIComponent(before)}` : ""}`, { cache: "no-store" }));
    if (selection.current !== id) return;
    setView(previous => {
      if (!previous || previous.handoff_case_id !== id) return result;
      if (before) return { ...result, messages: [...result.messages, ...previous.messages.filter(item => !result.messages.some(older => older.message_record_id === item.message_record_id))] };
      const older = previous.messages.filter(item => result.messages.length && item.created_at < result.messages[0].created_at);
      return older.length ? { ...result, next_before: previous.next_before, messages: [...older, ...result.messages] } : result;
    });
  }, [base]);

  useEffect(() => { void refresh(); const timer = setInterval(() => { void refresh(); }, 10000); return () => clearInterval(timer); }, [refresh]);
  useEffect(() => {
    setView(null); setDraft(""); setNote(""); setTarget(""); setCancelPending(false); replyId.current = null;
    if (!selected) return;
    const read = () => { void loadCase(selected).catch(reason => setError(reason.message)); };
    read(); const timer = setInterval(read, 10000);
    return () => clearInterval(timer);
  }, [selected, loadCase]);

  async function act(action: HandoffActionRequest["action"], actionTarget?: string) {
    if (!view || busy) return;
    const id = view.handoff_case_id;
    setBusy(true); setError("");
    if (action === "reply" && !replyId.current) replyId.current = crypto.randomUUID();
    const payload: HandoffActionRequest = {
      action, ownership_version: view.ownership_version,
      request_id: action === "reply" ? replyId.current! : crypto.randomUUID(),
      text: action === "reply" ? draft : note, target: actionTarget, cancel_pending: cancelPending,
    };
    try {
      const updated = await responseJson<HandoffConversation>(await fetch(`${base}/${encodeURIComponent(id)}/actions`, {
        method: "POST", headers: { "Content-Type": "application/json", "x-duka-csrf": csrfToken }, body: JSON.stringify(payload),
      }));
      if (selection.current === id) {
        setView(updated);
        if (action === "reply") { setDraft(""); replyId.current = null; }
      }
      await refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Action failed.");
      // Refresh ownership without discarding the unsent draft.
      await loadCase(id).catch(() => {});
    } finally { setBusy(false); }
  }
  const own = !!view?.claimed_at && view.assigned_principal_id === view.current_principal_id;
  const open = !!view?.bot_paused;

  return <section className={styles.root} aria-label="Handoff conversations">
    {error && <p role="alert" className={styles.error}>{error}</p>}
    <div className={styles.grid}>
      <aside className={styles.queue} aria-label="Case queue">
        <div className={styles.toolbar}><label htmlFor="handoff-filter">Cases</label><select id="handoff-filter" value={status} onChange={event => setStatus(event.target.value)}><option value="open">Open</option><option value="all">All</option></select><button type="button" title="Refresh conversations" aria-label="Refresh conversations" onClick={() => { void refresh(); if (selected) void loadCase(selected).catch(reason => setError(reason.message)); }}><RefreshCw size={17} /></button></div>
        {loading && <p role="status">Loading conversations...</p>}
        {!loading && !cases.length && <p>No {status === "open" ? "open " : ""}handoffs.</p>}
        {cases.map(item => <button className={styles.case} aria-pressed={selected === item.handoff_case_id} type="button" key={item.handoff_case_id} onClick={() => setSelected(item.handoff_case_id)}>
          <strong>{item.customer_name}{item.unread_count > 0 && <span className={styles.unread}>{item.unread_count} unread</span>}</strong>
          <span>{item.handoff_case_id}</span><span>{item.status.replaceAll("_", " ")} | {item.priority}</span>
          <small>{time(item.updated_at)}</small>
        </button>)}
      </aside>
      <div className={styles.conversation} role="region" aria-label="Selected conversation">
        {!selected ? <p>Select a conversation.</p> : !view ? <p role="status">Loading conversation...</p> : <>
          <header className={styles.header}><div><h2>{view.customer_name}</h2><p>{view.handoff_case_id} | {view.status.replaceAll("_", " ")} | {view.bot_paused ? "Bot paused" : "Bot available"}</p><p>Assigned: {view.candidates.find(item => item.principal_id === view.assigned_principal_id)?.display_name || view.assigned_principal_id || "Unassigned"}</p></div>
            <div className={styles.actions}><button title="Mark read" aria-label="Mark read" disabled={busy || !view.can_manage || !open} onClick={() => void act("read")}><Eye size={18} /></button><button className="duka-button duka-button--secondary" disabled={busy || !open || (!!view.claimed_at && !own)} onClick={() => void act("claim")}><UserCheck size={17} />{own ? "Claimed" : "Claim"}</button></div>
          </header>
          <section className={styles.summary} aria-label="Handoff summary"><h3>Handoff summary</h3><p>{view.summary}</p>{view.journey_id && <small>Journey: {view.journey_id}</small>}</section>
          <div className={styles.history} aria-label="Conversation history" aria-live="polite">
            {view.next_before && <button className="duka-button duka-button--secondary" onClick={() => void loadCase(selected, view.next_before!).catch(reason => setError(reason.message))}>Earlier messages</button>}
            {!view.messages.length && <p>No retained messages.</p>}
            {view.messages.map(item => <article className={styles.message} data-author={item.author} key={item.message_record_id}><header><strong>{item.author === "human" ? "Team" : item.author === "customer" ? view.customer_name : "Assistant"}</strong><time>{time(item.created_at)}</time></header><p>{item.text}</p>{item.attachments.map((attachment, index) => <small key={index}>[{attachment.type} attachment]</small>)}{item.delivery_status && <small>{item.delivery_status}</small>}</article>)}
          </div>
          {view.deliveries.filter(item => item.status !== "cancelled").map(item => <div className={styles.delivery} key={item.outbox_id}><strong>{item.direction === "customer" ? "Customer reply" : "Staff notification"}: {item.status.replaceAll("_", " ")}</strong><p>{item.text}</p>{item.error_code && <small>{item.error_code}</small>}{open && own && <button title="Cancel unsent delivery" aria-label="Cancel unsent delivery" disabled={busy} onClick={() => void act("cancel_delivery", item.outbox_id)}><X size={17} /></button>}</div>)}
          {!view.customer_window_open && open && <p className={styles.notice}>The customer messaging window is closed. Replies remain queued until the customer messages again. Human ownership stays active.</p>}
          {open && <form className={styles.composer} onSubmit={event => { event.preventDefault(); void act("reply"); }}><label htmlFor="handoff-reply">Reply as the business</label><textarea id="handoff-reply" name="reply" rows={3} maxLength={4000} value={draft} disabled={!own || busy} onChange={event => { setDraft(event.target.value); replyId.current = null; }} /><button className="duka-button" type="submit" disabled={!own || busy || !draft.trim()}><Send size={17} />Queue reply</button></form>}
          {open && view.can_manage && <section className={styles.controls} aria-label="Case controls">
            <div className={styles.toolbar}><UserRound size={17} /><label htmlFor="handoff-assignee">Reassign</label><select id="handoff-assignee" value={target} onChange={event => setTarget(event.target.value)}><option value="">Select staff</option>{view.candidates.map(candidate => <option key={candidate.principal_id} value={candidate.principal_id}>{candidate.display_name}</option>)}</select><button className="duka-button duka-button--secondary" disabled={busy || !target} onClick={() => void act("reassign", target)}>Assign</button></div>
            {own && <><label htmlFor="handoff-note">Resolution / bot recap</label><textarea id="handoff-note" name="note" rows={2} maxLength={2000} value={note} onChange={event => setNote(event.target.value)} /><label className={styles.check}><input type="checkbox" checked={cancelPending} onChange={event => setCancelPending(event.target.checked)} />Cancel unsent replies when closing</label><div className={styles.actions}><button className="duka-button duka-button--secondary" disabled={busy} onClick={() => void act("return_to_bot")}><CornerUpLeft size={17} />Return to bot</button><button className="duka-button duka-button--secondary" disabled={busy} onClick={() => void act("resolve")}><CheckCheck size={17} />Resolve</button></div></>}
          </section>}
        </>}
      </div>
    </div>
  </section>;
}
