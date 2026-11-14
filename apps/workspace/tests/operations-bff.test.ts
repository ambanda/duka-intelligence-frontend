import { NextRequest } from "next/server";
import { beforeEach, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ context: vi.fn(), membership: vi.fn(), mutation: vi.fn(), operation: vi.fn() }));
vi.mock("@/lib/bff/context", () => ({
  BffError: class extends Error {}, requireBffContext: mocks.context, requireBffWorkspace: mocks.membership,
  requireBffMutation: mocks.mutation, readBffJson: (r: Request) => r.json(),
  bffErrorResponse: () => new Response(null, { status: 403 }),
}));
import { GET, POST, PUT } from "@/app/api/bff/workspaces/[workspaceSlug]/operations/[...path]/route";
const params = (path: string[]) => ({ params: Promise.resolve({ workspaceSlug: "my-workspace", path }) });
beforeEach(() => {
  vi.resetAllMocks();
  mocks.context.mockResolvedValue({ session: {}, client: { workspaceOperation: mocks.operation } });
  mocks.membership.mockReturnValue({ workspaceId: "authorized-workspace", roles: ["workspace_admin"] });
  mocks.operation.mockResolvedValue({ contacts: [] });
});
it("uses server membership and only forwards allowed filters", async () => {
  const response = await GET(new NextRequest("https://app.test/operations/people?search=Amina&relationship=customer&tenant_id=foreign"), params(["people"]));
  expect(response.status).toBe(200);
  expect(mocks.operation).toHaveBeenCalledWith("authorized-workspace", ["people"], "GET", undefined, "?search=Amina&relationship=customer");
  expect(response.headers.get("cache-control")).toBe("no-store");
});
it("requires CSRF before a dispatch is confirmed", async () => {
  mocks.mutation.mockImplementation(() => { throw new Error("CSRF failed"); });
  expect((await POST(new NextRequest("https://app.test/operations/dispatches/d/confirm", { method: "POST", body: "{}" }), params(["dispatches", "d", "confirm"]))).status).toBe(403);
  expect(mocks.operation).not.toHaveBeenCalled();
});
it.each([["setup", "skills", "common.public_faq"], ["people", "person-1"]])("allows governed PUT routes: %s", async (...path) => {
  const response = await PUT(new NextRequest("https://app.test/operations", { method: "PUT", body: "{}" }), params(path));
  expect(response.status).toBe(200); expect(mocks.mutation).toHaveBeenCalledOnce();
});
it("blocks non-administrators and unknown operations", async () => {
  mocks.membership.mockReturnValue({ workspaceId: "authorized-workspace", roles: ["customer"] });
  expect((await GET(new NextRequest("https://app.test/operations/people"), params(["people"]))).status).toBe(403);
  expect(mocks.operation).not.toHaveBeenCalled();
});
it("does not turn the BFF into an arbitrary backend proxy", async () => {
  const read = await GET(new NextRequest("https://app.test/operations/private"), params(["secrets"]));
  const write = await POST(new NextRequest("https://app.test/operations/source", { method: "POST", body: "{}" }), params(["data-sources", "source-1", "delete-all"]));
  expect(read.status).toBe(403); expect(write.status).toBe(403);
  expect(mocks.operation).not.toHaveBeenCalled();
});
