import type { StatusBadgeProps } from "@duka/ui";

export type StatusTone = NonNullable<StatusBadgeProps["tone"]>;

const labels: Record<string, string> = {
  active: "Connected",
  cancelled: "Cancelled",
  code_exchanged: "Securing Meta authorization",
  disconnected: "Disconnected",
  failed: "Connection failed",
  onboarding: "Starting connection",
  pending: "Starting connection",
  provisioning: "Configuring webhook",
  registering_phone: "Registering phone",
  requires_action: "Action required",
  validating_assets: "Validating business assets",
  verification_pending: "Waiting for verification",
};

export function channelStatusLabel(status: string): string {
  return labels[status] ?? status.replaceAll("_", " ");
}

export function channelStatusTone(status: string): StatusTone {
  if (status === "active") return "success";
  if (["failed", "disconnected", "cancelled"].includes(status)) return "danger";
  if (["requires_action", "verification_pending"].includes(status)) return "warning";
  return "neutral";
}

export function maskIdentifier(value: string | null | undefined): string {
  if (!value) return "Not available";
  if (value.length <= 6) return "***";
  return `${value.slice(0, 3)}...${value.slice(-3)}`;
}

export function formatTimestamp(value: string | null | undefined): string {
  if (!value) return "Never";
  return new Intl.DateTimeFormat("en-KE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}
