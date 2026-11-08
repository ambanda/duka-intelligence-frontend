import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  context: vi.fn(), mutation: vi.fn(), membership: vi.fn(), create: vi.fn(), eligibility: vi.fn(),
}));
vi.mock("@/lib/bff/context", () => ({
  requireBffContext: mocks.context,
  requireBffMutation: mocks.mutation,
  requireBffWorkspace: mocks.membership,
  readBffJson: (request: Request) => request.json(),
  bffErrorResponse: () => new Response(null, { status: 403 }),
}));

import { POST as createContact } from "@/app/api/bff/workspaces/[workspaceSlug]/channels/[channelId]/contacts/route";
import { POST as checkEligibility } from "@/app/api/bff/workspaces/[workspaceSlug]/channels/[channelId]/message-eligibility/route";

const params = { params: Promise.resolve({ workspaceSlug: "my-workspace", channelId: "channel-1" }) };
function request(body: unknown) {
  return new NextRequest("https://app.example.test/api/bff/contacts", {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.resetAllMocks();
  mocks.context.mockResolvedValue({ session: {}, client: { createWhatsappContact: mocks.create, whatsappMessageEligibility: mocks.eligibility } });
  mocks.membership.mockReturnValue({ workspaceId: "authorized-workspace-id" });
  mocks.create.mockResolvedValue({
    created: true, consent_outcome: "not_recorded",
    contact: { contact_id: "contact-1", phone_number_e164: "+254700000001", display_name: "Amina",
      preferred_name: null, tags: [], consent_purposes: [], contact_type: "prospect", identity_status: "unidentified",
      marketing_consent_status: "unknown", last_seen_at: "2026-01-01T00:00:00Z", credential_secret_ref: "must-not-leak" },
  });
});

describe("contact creation BFF boundary", () => {
  it("uses authoritative workspace membership and sanitizes the response", async () => {
    const body = { phone_number_e164: "+254700000001", display_name: "Amina" };
    const response = await createContact(request(body), params);
    expect(response.status).toBe(201);
    expect(mocks.mutation).toHaveBeenCalledOnce();
    expect(mocks.create).toHaveBeenCalledWith("authorized-workspace-id", "channel-1", body);
    const result = await response.json();
    expect(result).toMatchObject({ created: true, consent_outcome: "not_recorded", contact: { recipient: "+254700000001" } });
    expect(result.contact).not.toHaveProperty("credential_secret_ref");
  });

  it.each(["mutation", "membership"] as const)("rejects a failed %s guard before backend mutation", async (guard) => {
    mocks[guard].mockImplementation(() => { throw new Error("denied"); });
    expect((await createContact(request({ phone_number_e164: "+254700000001" }), params)).status).toBe(403);
    expect(mocks.create).not.toHaveBeenCalled();
  });

  it("checks eligibility without creating a contact or sending a message", async () => {
    mocks.eligibility.mockResolvedValue({ eligible: false, reason: "marketing_consent_missing" });
    const payload = { recipient: "+254700000001", template_record_id: "template-1", purpose: "catalog_updates" };
    const response = await checkEligibility(request(payload), params);
    expect(mocks.mutation).toHaveBeenCalledOnce();
    expect(mocks.eligibility).toHaveBeenCalledWith("authorized-workspace-id", "channel-1", payload);
    expect(await response.json()).toEqual({ eligible: false, reason: "marketing_consent_missing" });
    expect(mocks.create).not.toHaveBeenCalled();
  });
});
