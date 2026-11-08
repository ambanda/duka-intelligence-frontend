import { NextRequest, NextResponse } from "next/server";
import { BffError, bffErrorResponse, requireBffContext, requireBffWorkspace, requireBffMutation, readBffJson } from "@/lib/bff/context";

type Params = { params: Promise<{ workspaceSlug: string; path?: string[] }> };

async function handle(request: NextRequest, { params }: Params) {
  try {
    const { workspaceSlug, path = [] } = await params;
    const { client, session } = await requireBffContext(request);
    const membership = requireBffWorkspace(session, workspaceSlug);
    if (!membership.roles.some((role) => ["owner", "admin", "workspace_admin"].includes(role))) {
      throw new BffError(403, "knowledge_admin_required", "Workspace administrator access is required.");
    }
    const method = request.method as "GET" | "PUT" | "POST";
    const route = path.join("/");
    const allowed = method === "GET"
      ? !path.length || /^objects\/[^/]+\/revisions$/.test(route)
      : method === "PUT"
        ? /^(collections|sources)\/[^/]+$/.test(route) || /^objects\/[^/]+\/draft$/.test(route) || ["bindings", "grants"].includes(route)
        : /^objects\/[^/]+\/(publish|archive)$/.test(route);
    if (!allowed) throw new BffError(404, "knowledge_route_not_found", "Knowledge operation was not found.");
    if (method !== "GET") requireBffMutation(request, session);
    const body = method === "GET" ? undefined : await readBffJson(request);
    const result = path.length
      ? await client.knowledgeOperation(membership.workspaceId, path, method, body)
      : await client.knowledgeInventory(membership.workspaceId);
    return NextResponse.json(result);
  } catch (error) {
    return bffErrorResponse(error);
  }
}

export const GET = handle;
export const PUT = handle;
export const POST = handle;
