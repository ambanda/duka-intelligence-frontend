import { DukaApiClient } from "@duka/api-client";
import { describe, expect, it, vi } from "vitest";

describe("Duka API client", () => {
  it("retries a safe GET once and preserves the correlation ID", async () => {
    const fetchImpl = vi.fn()
      .mockResolvedValueOnce(new Response("", { status: 503 }))
      .mockResolvedValueOnce(Response.json({ principal_id: "p1", email: null, display_name: null, workspace_count: 0 }));
    const client = new DukaApiClient({ baseUrl: "https://api.example", fetchImpl, getAccessToken: async () => "access", requestIdFactory: () => "request-123" });
    await expect(client.getMe()).resolves.toMatchObject({ principal_id: "p1" });
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    expect(fetchImpl.mock.calls[0][1]?.headers).toMatchObject({ "x-request-id": "request-123", Authorization: "Bearer access" });
  });

  it("does not retry a mutation", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response("", { status: 503 }));
    const client = new DukaApiClient({ baseUrl: "https://api.example", fetchImpl });
    await expect(client.createWhatsappOnboardingSession("workspace-a", {})).rejects.toMatchObject({ status: 503 });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it("saves a versioned skill draft with PUT and encodes the skill identifier", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(Response.json({ workspace_id: "workspace-a", skill: {} }));
    const client = new DukaApiClient({ baseUrl: "https://api.example", fetchImpl, getAccessToken: async () => "access" });
    await client.saveSkillDraft("workspace-a", "sacco.member_lookup", {
      config: { enabled_services: ["loans"] },
      expected_version: 3,
    });
    expect(fetchImpl).toHaveBeenCalledOnce();
    expect(fetchImpl.mock.calls[0][0]).toBe("https://api.example/v1/workspaces/workspace-a/skills/sacco.member_lookup/draft");
    expect(fetchImpl.mock.calls[0][1]).toMatchObject({ method: "PUT", body: JSON.stringify({ config: { enabled_services: ["loans"] }, expected_version: 3 }) });
  });

  it("preserves backend validation details", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(Response.json({ detail: "Save a skill draft before validation" }, { status: 422 }));
    const client = new DukaApiClient({ baseUrl: "https://api.example", fetchImpl });
    await expect(client.validateSkill("workspace-a", "sacco.member_lookup")).rejects.toMatchObject({
      status: 422,
      detail: "Save a skill draft before validation",
      message: "Save a skill draft before validation",
    });
  });

  it("submits a workspace-owned WhatsApp template through the management endpoint", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(Response.json({ template_record_id: "template-1" }, { status: 201 }));
    const client = new DukaApiClient({ baseUrl: "https://api.example", fetchImpl });
    const payload = {
      name: "appointment_confirmation_v1",
      language: "en",
      category: "UTILITY" as const,
      body_text: "Appointment {{1}} is confirmed.",
      body_examples: ["APT-1"],
      quick_replies: ["Review"],
      idempotency_key: "template-submit-001",
    };

    await client.createWhatsappMessageTemplate("workspace-a", "channel/a", payload);

    expect(fetchImpl.mock.calls[0][0]).toBe("https://api.example/v1/workspaces/workspace-a/channels/channel%2Fa/message-templates");
    expect(fetchImpl.mock.calls[0][1]).toMatchObject({ method: "POST", body: JSON.stringify(payload) });
  });

  it("creates and validates a named-parameter template draft", async () => {
    const fetchImpl = vi.fn()
      .mockResolvedValueOnce(Response.json({ template_record_id: "template-1" }, { status: 201 }))
      .mockResolvedValueOnce(Response.json({ valid: true, issues: [] }));
    const client = new DukaApiClient({ baseUrl: "https://api.example", fetchImpl });
    const payload = {
      name: "appointment_confirmation_v2",
      language: "en_US",
      category: "UTILITY" as const,
      definition: {
        parameter_format: "named" as const,
        body: { text: "Hello {{customer_name}}", parameters: [{ name: "customer_name", example: "Francis", value_type: "text" as const }] },
        buttons: [],
      },
      idempotency_key: "template-draft-001",
    };
    await client.createWhatsappTemplateDraft("workspace-a", "channel-1", payload);
    await client.validateWhatsappTemplateDraft("workspace-a", "channel-1", "template-1");
    expect(fetchImpl.mock.calls[0][0]).toContain("/message-templates/drafts");
    expect(fetchImpl.mock.calls[1][0]).toContain("/message-templates/template-1/validate");
  });

  it("sends an approved template through the workspace messaging endpoint", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(Response.json({ request_id: "message-1" }, { status: 202 }));
    const client = new DukaApiClient({ baseUrl: "https://api.example", fetchImpl });
    const payload = {
      recipient: "+254725375358",
      template_record_id: "template-1",
      body_parameters: ["APT-1"],
      header_parameters: [],
      purpose: "appointment_confirmation",
      business_reference: "APT-1",
      idempotency_key: "message-send-001",
    };

    await client.sendWorkspaceWhatsappTemplate("workspace-a", "channel-1", payload);

    expect(fetchImpl.mock.calls[0][0]).toBe("https://api.example/v1/workspaces/workspace-a/channels/channel-1/messages");
    expect(fetchImpl.mock.calls[0][1]).toMatchObject({ method: "POST", body: JSON.stringify(payload) });
  });
});
