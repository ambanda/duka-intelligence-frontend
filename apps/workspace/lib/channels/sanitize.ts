import "server-only";

import type { ChannelSummary, OnboardingStatusResponse, PendingOnboardingSession, WorkspaceChannelsResponse } from "@duka/api-client";

import type { ChannelView, OnboardingView, PendingOnboardingView, WorkspaceChannelsView } from "./contracts";

function mask(value: string | null | undefined): string {
  if (!value) return "Not available";
  if (value.length <= 6) return "***";
  return `${value.slice(0, 3)}...${value.slice(-3)}`;
}

export function sanitizeOnboarding(status: OnboardingStatusResponse): OnboardingView {
  return {
    session_id: status.session_id,
    channel_id: status.channel_id,
    status: status.status,
    bot_phone_number: status.bot_phone_number,
    display_name: status.display_name,
    expires_at: status.expires_at,
    error_code: status.error_code,
    error_summary: status.error_summary,
    required_action: status.required_action,
  };
}

function sanitizePending(status: PendingOnboardingSession): PendingOnboardingView {
  return {
    session_id: status.session_id,
    channel_id: null,
    status: status.status,
    bot_phone_number: status.bot_phone_number,
    display_name: status.display_name,
    expires_at: status.expires_at,
    error_code: status.error_code,
    error_summary: status.error_summary,
    required_action: status.required_action,
    sector: status.sector,
    shop_id: status.shop_id,
    updated_at: status.updated_at,
  };
}

export function sanitizeChannel(channel: ChannelSummary): ChannelView {
  return {
    channel_id: channel.channel_id,
    channel_type: channel.channel_type,
    transport: channel.transport,
    display_number: channel.display_number,
    display_name: channel.display_name,
    status: channel.status,
    sector: channel.sector,
    default_shop_id: channel.default_shop_id,
    waba_identifier: mask(channel.provider_account_id),
    webhook_health: channel.webhook_health,
    onboarding_status: channel.onboarding_status ? {
      session_id: channel.onboarding_status.session_id,
      channel_id: channel.channel_id,
      status: channel.onboarding_status.status,
      bot_phone_number: channel.display_number,
      display_name: channel.display_name,
      expires_at: channel.onboarding_status.expires_at,
      error_code: channel.onboarding_status.error_code,
      error_summary: channel.onboarding_status.error_summary,
      required_action: channel.onboarding_status.required_action,
    } : null,
    created_at: channel.created_at,
    updated_at: channel.updated_at,
  };
}

export function sanitizeWorkspaceChannels(response: WorkspaceChannelsResponse): WorkspaceChannelsView {
  return {
    channels: response.channels.map(sanitizeChannel),
    pending_onboarding_sessions: response.pending_onboarding_sessions.map(sanitizePending),
  };
}
