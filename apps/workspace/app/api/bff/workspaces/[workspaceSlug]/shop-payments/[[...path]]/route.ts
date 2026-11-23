import { NextRequest, NextResponse } from "next/server";
import { BffError, bffErrorResponse, readBffJson, requireBffContext, requireBffMutation, requireBffWorkspace } from "@/lib/bff/context";
type Context = { params: Promise<{ workspaceSlug: string; path?: string[] }> };
async function handle(request: NextRequest, context: Context) {
  try {
    const { workspaceSlug, path = [] } = await context.params;
    const method = request.method as "GET" | "PUT" | "POST";
    const valid = path.every(part => /^[A-Za-z0-9_.:-]{1,120}$/.test(part) && !part.includes(".."));
    const allowed = (method === "GET" && path.length === 0)
      || (method === "PUT" && path.length === 2 && ["shops", "connections", "methods"].includes(path[0]))
      || (method === "POST" && path.length === 3 && ((path[0] === "connections" && path[2] === "check") || (path[0] === "methods" && ["activate", "pause"].includes(path[2]))));
    if (!valid || !allowed) throw new BffError(404, "operation_not_found", "Payment operation was not found.");
    const { session, client } = await requireBffContext(request);
    const membership = requireBffWorkspace(session, workspaceSlug);
    if (method !== "GET") requireBffMutation(request, session);
    const payload = method === "PUT" || path[2] === "activate" ? await readBffJson<unknown>(request) : undefined;
    const result = await client.shopPaymentsOperation(membership.workspaceId, path, method, payload);
    return NextResponse.json(result, { headers: { "cache-control": "no-store" } });
  } catch (error) { return bffErrorResponse(error); }
}
export const GET = handle;
export const PUT = handle;
export const POST = handle;
