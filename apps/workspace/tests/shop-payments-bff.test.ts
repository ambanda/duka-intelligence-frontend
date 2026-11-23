import { NextRequest } from "next/server";
import { beforeEach, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ context: vi.fn(), workspace: vi.fn(), mutation: vi.fn(), operation: vi.fn() }));
vi.mock("@/lib/bff/context", () => ({
  BffError: class extends Error {}, requireBffContext: mocks.context, requireBffWorkspace: mocks.workspace,
  requireBffMutation: mocks.mutation, readBffJson: (request: Request) => request.json(),
  bffErrorResponse: () => new Response(null, { status: 403 }),
}));
import { GET, PUT, POST } from "@/app/api/bff/workspaces/[workspaceSlug]/shop-payments/[[...path]]/route";
const params = (path: string[] = []) => ({ params: Promise.resolve({ workspaceSlug: "retail", path }) });
beforeEach(() => {
  vi.resetAllMocks();
  mocks.context.mockResolvedValue({ session: {}, client: { shopPaymentsOperation: mocks.operation } });
  mocks.workspace.mockReturnValue({ workspaceId: "authorized-workspace" });
  mocks.operation.mockResolvedValue({ shops: [] });
});
it("uses authoritative workspace membership and disables caching", async () => {
  const response = await GET(new NextRequest("https://app.test/payments?tenant_id=foreign"), params());
  expect(mocks.operation).toHaveBeenCalledWith("authorized-workspace", [], "GET", undefined);
  expect(response.headers.get("cache-control")).toBe("no-store");
});
it("requires CSRF for setup and activation", async () => {
  const request = (method: string) => new NextRequest("https://app.test/payments", { method, body: JSON.stringify({ test_payment_intent_id: "proof-1" }) });
  mocks.mutation.mockImplementationOnce(() => { throw new Error("csrf"); });
  expect((await PUT(request("PUT"), params(["shops", "main"]))).status).toBe(403);
  expect(mocks.operation).not.toHaveBeenCalled();
  expect((await POST(request("POST"), params(["methods", "main", "activate"]))).status).toBe(200);
  expect(mocks.operation).toHaveBeenCalledWith("authorized-workspace", ["methods", "main", "activate"], "POST", { test_payment_intent_id: "proof-1" });
});
it("rejects arbitrary backend operations and path traversal", async () => {
  for (const path of [["secrets"], ["connections", "..", "check"], ["methods", "main", "delete"]]) {
    expect((await POST(new NextRequest("https://app.test/payments", { method: "POST" }), params(path))).status).toBe(403);
  }
  expect(mocks.operation).not.toHaveBeenCalled();
});
