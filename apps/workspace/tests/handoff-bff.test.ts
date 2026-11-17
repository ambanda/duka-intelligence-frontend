import { NextRequest } from "next/server";
import { beforeEach, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ context: vi.fn(), workspace: vi.fn(), mutation: vi.fn(), list: vi.fn(), detail: vi.fn(), act: vi.fn() }));
vi.mock("@/lib/bff/context", () => ({
  BffError: class extends Error {}, requireBffContext: mocks.context, requireBffWorkspace: mocks.workspace,
  requireBffMutation: mocks.mutation, readBffJson: (request: Request) => request.json(),
  bffErrorResponse: () => new Response(null, { status: 403 }),
}));
import { GET, POST } from "@/app/api/bff/workspaces/[workspaceSlug]/channels/[channelId]/handoffs/[[...path]]/route";
const id = "HND-ABCDEF012345";
const params = (path: string[] = []) => ({ params: Promise.resolve({ workspaceSlug: "clinic", channelId: "channel-a", path }) });
beforeEach(() => {
  vi.resetAllMocks();
  mocks.context.mockResolvedValue({ session: {}, client: { listHandoffConversations: mocks.list, getHandoffConversation: mocks.detail, actOnHandoffConversation: mocks.act } });
  mocks.workspace.mockReturnValue({ workspaceId: "authorized-workspace" });
  mocks.list.mockResolvedValue({ cases: [] }); mocks.detail.mockResolvedValue({ handoff_case_id: id }); mocks.act.mockResolvedValue({ handoff_case_id: id });
});
it("uses authoritative membership, whitelists filters and disables caching", async () => {
  const result = await GET(new NextRequest("https://app.test/handoffs?status=all&tenant_id=foreign"), params());
  expect(mocks.list).toHaveBeenCalledWith("authorized-workspace", "channel-a", "all");
  expect(result.headers.get("cache-control")).toBe("no-store");
});
it("requires CSRF and preserves ownership version and reply idempotency", async () => {
  const payload = { action: "reply", ownership_version: 3, request_id: "reply-1", text: "Ready", tenant_id: "foreign" };
  const request = () => new NextRequest("https://app.test/handoffs", { method: "POST", body: JSON.stringify(payload) });
  mocks.mutation.mockImplementationOnce(() => { throw new Error("csrf"); });
  expect((await POST(request(), params([id, "actions"]))).status).toBe(403);
  expect(mocks.act).not.toHaveBeenCalled();
  expect((await POST(request(), params([id, "actions"]))).status).toBe(200);
  expect(mocks.act).toHaveBeenCalledWith("authorized-workspace", "channel-a", id, expect.objectContaining({ ownership_version: 3, request_id: "reply-1" }));
  expect(mocks.act.mock.calls[0][3]).not.toHaveProperty("tenant_id");
});
it("does not expose an arbitrary backend proxy or require channel-admin powers", async () => {
  expect((await GET(new NextRequest("https://app.test/handoffs"), params(["secrets"]))).status).toBe(403);
  expect((await POST(new NextRequest("https://app.test/handoffs", { method: "POST", body: "{}" }), params([id, "delete"]))).status).toBe(403);
  expect(mocks.act).not.toHaveBeenCalled();
  await GET(new NextRequest("https://app.test/handoffs?before=message-1"), params([id]));
  expect(mocks.detail).toHaveBeenCalledWith("authorized-workspace", "channel-a", id, "message-1");
});
