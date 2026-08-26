import type { ChannelSummary, OnboardingStatusResponse } from "@duka/api-client";
import { describe, expect, it } from "vitest";

import { channelStatusLabel, channelStatusTone } from "@/lib/channels/status";
import { sanitizeChannel, sanitizeOnboarding } from "@/lib/channels/sanitize";

const onboarding: OnboardingStatusResponse = {
  session_id: "session-1", channel_id: "channel-1", status: "requires_action", workspace_id: "workspace-a",
  waba_id: "123456789", phone_number_id: "987654321", bot_phone_number: "+254700000000", display_name: "Acme",
  expires_at: "2030-01-01T00:00:00Z", error_code: null, error_summary: null, required_action: "provide_registration_pin",
};

describe("channel browser contract", () => {
  it("maps every workflow status to human operational language", () => {
    expect(channelStatusLabel("validating_assets")).toBe("Validating business assets");
    expect(channelStatusLabel("active")).toBe("Connected");
    expect(channelStatusTone("failed")).toBe("danger");
  });

  it("removes Meta asset IDs from onboarding responses", () => {
    const safe = sanitizeOnboarding(onboarding);
    expect(safe).not.toHaveProperty("waba_id");
    expect(safe).not.toHaveProperty("phone_number_id");
    expect(safe.required_action).toBe("provide_registration_pin");
  });

  it("masks channel provider identifiers", () => {
    const channel = {
      channel_id: "channel-1", channel_type: "whatsapp", transport: "whatsapp_cloud_api", display_number: "+254700000000",
      display_name: "Acme", status: "active", channel_account_id: "phone-secret", provider_account_id: "123456789",
      provider_business_id: "business-secret", tenant_id: "tenant-a", client_id: "client-a", workspace_id: "workspace-a",
      organization_id: "org-a", sector: "sacco", default_shop_id: "hq", webhook_health: { status: "healthy", healthy: true, last_received_at: null },
      onboarding_status: null, token_expires_at: "2030-01-01T00:00:00Z", created_at: "2029-01-01T00:00:00Z", updated_at: "2029-01-01T00:00:00Z",
    } satisfies ChannelSummary;
    const safe = sanitizeChannel(channel);
    expect(safe.waba_identifier).toBe("123...789");
    expect(safe).not.toHaveProperty("channel_account_id");
    expect(safe).not.toHaveProperty("provider_business_id");
    expect(safe).not.toHaveProperty("token_expires_at");
  });
});
