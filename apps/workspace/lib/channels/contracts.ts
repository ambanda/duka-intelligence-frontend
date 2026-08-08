export interface ChannelView {
  channel_id: string;
  channel_type: string;
  transport: string;
  display_number: string | null;
  display_name: string;
  status: string;
  sector: string;
  default_shop_id: string;
  waba_identifier: string;
  webhook_health: { status: string; healthy: boolean; last_received_at: string | null };
  onboarding_status: OnboardingView | null;
  created_at: string;
  updated_at: string;
}

export interface OnboardingView {
  session_id: string;
  channel_id: string | null;
  status: string;
  bot_phone_number: string | null;
  display_name: string | null;
  expires_at: string | null;
  error_code: string | null;
  error_summary: string | null;
  required_action: string | null;
}

export interface PendingOnboardingView extends OnboardingView {
  sector: string;
  shop_id: string;
  updated_at: string;
}

export interface WorkspaceChannelsView {
  channels: ChannelView[];
  pending_onboarding_sessions: PendingOnboardingView[];
}
