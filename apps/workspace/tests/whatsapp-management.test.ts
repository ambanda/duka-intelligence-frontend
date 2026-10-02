import { describe, expect, it } from "vitest";

import { canManageChannels } from "@/lib/channels/permissions";
import { sanitizeMessageTemplate, sanitizeWhatsAppContact, sanitizeWorkspaceMessage } from "@/lib/whatsapp-management/sanitize";

describe("WhatsApp workspace management", () => {
  it("matches backend channel administrator roles", () => {
    expect(canManageChannels(["channel_admin"])).toBe(true);
    expect(canManageChannels(["workspace_admin"])).toBe(true);
    expect(canManageChannels(["viewer"])).toBe(false);
  });

  it("masks the contact label while preserving the authorized send address", () => {
    const contact = sanitizeWhatsAppContact({
      contact_id: "contact-1",
      phone_number_e164: "+254725375358",
      contact_type: "customer",
      identity_status: "verified",
      marketing_consent_status: "opted_in",
      status: "active",
      last_seen_at: "2030-01-01T00:00:00Z",
    });
    expect(contact.display_phone_number).toBe("+254 *** 5358");
    expect(contact.recipient).toBe("+254725375358");
    expect(contact).not.toHaveProperty("status");
  });

  it("exposes template and delivery evidence without adding channel credentials", () => {
    const template = sanitizeMessageTemplate({
      template_record_id: "template-1", channel_id: "channel-1", provider_template_id: "meta-1",
      name: "appointment_confirmation_v1", language: "en", category: "UTILITY",
      components: [{ type: "BODY", text: "Hello {{1}}" }], status: "APPROVED", source: "duka",
      layout_type: "STANDARD", parameter_format: "positional", definition: {},
      send_schema: { version: 1, parameter_format: "positional", fields: [{ key: "body.1", component: "body", value_type: "text", label: "Name", required: true }] },
      validation_errors: [], draft_version: 1, quality_score: "GREEN", quality_updated_at: null,
      rejection_reason: null, submitted_at: null, last_reconciled_at: null,
      created_at: "2030-01-01T00:00:00Z", updated_at: "2030-01-01T00:00:00Z",
    });
    const message = sanitizeWorkspaceMessage({
      request_id: "request-1", message_record_id: "message-1", provider_message_id: "wamid-1",
      template_name: template.name, template_category: "UTILITY", processing_status: "completed",
      delivery_status: "delivered", error_code: null, sent_at: "2030-01-01T00:00:00Z",
      delivered_at: "2030-01-01T00:01:00Z", read_at: null, created_at: "2030-01-01T00:00:00Z",
    });
    expect(template).not.toHaveProperty("channel_id");
    expect(message).toMatchObject({ provider_message_id: "wamid-1", delivery_status: "delivered" });
  });
});
