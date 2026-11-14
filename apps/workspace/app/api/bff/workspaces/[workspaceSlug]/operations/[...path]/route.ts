import { NextRequest, NextResponse } from "next/server";
import { BffError, bffErrorResponse, requireBffContext, requireBffWorkspace, requireBffMutation, readBffJson } from "@/lib/bff/context";

type Params = { params: Promise<{ workspaceSlug: string; path: string[] }> };

async function handle(request: NextRequest, { params }: Params) {
  try {
    const { workspaceSlug, path } = await params;
    const { client, session } = await requireBffContext(request);
    const membership = requireBffWorkspace(session, workspaceSlug);
    if (!membership.roles.some((role) => ["owner", "admin", "workspace_admin"].includes(role))) {
      throw new BffError(403, "workspace_admin_required", "Workspace administrator access is required.");
    }
    const method = request.method as "GET" | "POST" | "PUT";
    const route = path.join("/");
    const allowed = method === "GET"
      ? /^(people(\/[^/]+)?|channels|dispatches\/[^/]+|data-sources|setup)$/.test(route)
      : method === "POST"
        ? /^(people|people\/[^/]+\/(reachability|principal|access)|dispatches|dispatches\/[^/]+\/confirm|data-sources\/[^/]+\/(test|sync|pause|resume)|content)$/.test(route)
        : /^(people\/[^/]+|data-sources\/[^/]+|setup\/skills\/[^/]+)$/.test(route);
    if (!allowed || path.some((part) => !/^[a-zA-Z0-9_.:-]+$/.test(part))) throw new BffError(404, "operation_not_found", "Workspace operation was not found.");
    if (method !== "GET") requireBffMutation(request, session);
    const query = new URLSearchParams();
    for (const key of ["search", "after", "limit", "relationship"]) {
      const value = request.nextUrl.searchParams.get(key);
      if (value) query.set(key, value);
    }
    const result = await client.workspaceOperation(membership.workspaceId, path, method, method === "GET" ? undefined : await readBffJson(request), query.size ? `?${query}` : "");
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return bffErrorResponse(error); }
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
