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
});
