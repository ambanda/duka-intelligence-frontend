"use client";

import { StatusBadge } from "@duka/ui";
import { AlertTriangle, MessageCircleMore, RefreshCw, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { OperationalEmptyState } from "./operational-empty-state";
import type { ChannelView, PendingOnboardingView, WorkspaceChannelsView } from "@/lib/channels/contracts";
import { channelStatusLabel, channelStatusTone, formatTimestamp } from "@/lib/channels/status";

function errorMessage(status: number): string {
  if (status === 401) return "Your session expired. Sign in again to view channels.";
  if (status === 403) return "You do not have permission to view channels in this workspace.";
  return "Channel status could not be loaded from the Duka control plane.";
}

function PendingRow({ session }: { session: PendingOnboardingView }) {
  return (
    <article className="channel-row">
      <div className="channel-row__identity"><MessageCircleMore size={20} /><div><strong>{session.display_name || "WhatsApp onboarding"}</strong><span>{session.bot_phone_number || session.session_id}</span></div></div>
      <StatusBadge tone={channelStatusTone(session.status)}>{channelStatusLabel(session.status)}</StatusBadge>
      <div><span className="data-label">Scope</span><strong>{session.sector} / {session.shop_id}</strong></div>
      <div><span className="data-label">Updated</span><strong>{formatTimestamp(session.updated_at)}</strong></div>
      <Link className="text-link channel-row__action" href={`channels/whatsapp/connect?session=${encodeURIComponent(session.session_id)}`}>Resume</Link>
    </article>
  );
}

function ChannelRow({ channel, csrfToken, onChanged, workspaceSlug }: { channel: ChannelView; csrfToken: string; onChanged: () => void; workspaceSlug: string }) {
  const [busy, setBusy] = useState(false);
  async function disconnect() {
    if (!window.confirm(`Disconnect ${channel.display_name}? Messages will stop until the channel is reconnected.`)) return;
    setBusy(true);
    try {
      const response = await fetch(`/api/bff/workspaces/${encodeURIComponent(workspaceSlug)}/channels/${encodeURIComponent(channel.channel_id)}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "x-duka-csrf": csrfToken },
        body: JSON.stringify({ reason: "workspace_admin" }),
      });
      if (response.ok) onChanged();
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="channel-row">
      <div className="channel-row__identity"><MessageCircleMore size={20} /><div><strong>{channel.display_name}</strong><span>{channel.display_number}</span></div></div>
      <StatusBadge tone={channelStatusTone(channel.status)}>{channelStatusLabel(channel.status)}</StatusBadge>
      <div><span className="data-label">Transport</span><strong>{channel.transport.replaceAll("_", " ")}</strong></div>
      <div><span className="data-label">Webhook</span><strong>{channel.webhook_health.healthy ? "Healthy" : channel.webhook_health.status}</strong><small>{formatTimestamp(channel.webhook_health.last_received_at)}</small></div>
      <div><span className="data-label">WABA</span><strong>{channel.waba_identifier}</strong><small>Connected {formatTimestamp(channel.created_at)}</small></div>
      <button aria-label={`Disconnect ${channel.display_name}`} className="icon-button channel-row__action" disabled={busy} onClick={disconnect} title="Disconnect channel" type="button"><Trash2 size={17} /></button>
    </article>
  );
}

export function ChannelsPanel({ csrfToken, workspaceSlug }: { csrfToken: string; workspaceSlug: string }) {
  const [data, setData] = useState<WorkspaceChannelsView | null>(null);
  const [error, setError] = useState<{ status: number; message: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/bff/workspaces/${encodeURIComponent(workspaceSlug)}/channels`, { cache: "no-store" });
      if (!response.ok) throw { status: response.status };
      setData(await response.json());
    } catch (reason) {
      const status = typeof reason === "object" && reason && "status" in reason ? Number(reason.status) : 0;
      setError({ status, message: errorMessage(status) });
    } finally {
      setLoading(false);
    }
  }, [workspaceSlug]);

  useEffect(() => { void load(); }, [load]);

  if (loading) return <div className="loading-state" aria-live="polite"><RefreshCw className="spin" size={18} />Loading authorized channels...</div>;
  if (error) return <div className="error-state"><AlertTriangle size={20} /><div><strong>Channels unavailable</strong><p>{error.message}</p>{error.status === 401 ? <Link className="text-link" href="/sign-in">Sign in again</Link> : <button className="duka-button duka-button--secondary" onClick={load}>Retry</button>}</div></div>;
  if (!data || (!data.channels.length && !data.pending_onboarding_sessions.length)) {
    return <OperationalEmptyState actionHref={`/w/${workspaceSlug}/channels/whatsapp/connect`} actionLabel="Connect WhatsApp" description="No channels are connected. Add a WhatsApp Business account, then assign internal, self-service, or campaign access policies." icon={MessageCircleMore} title="No connected channels" />;
  }

  return (
    <div className="channel-list">
      {data.pending_onboarding_sessions.map((session) => <PendingRow key={session.session_id} session={session} />)}
      {data.channels.map((channel) => <ChannelRow channel={channel} csrfToken={csrfToken} key={channel.channel_id} onChanged={load} workspaceSlug={workspaceSlug} />)}
    </div>
  );
}
