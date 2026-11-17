import type { HandoffActionRequest } from "@duka/api-client";
import { NextRequest, NextResponse } from "next/server";
import { BffError, bffErrorResponse, readBffJson, requireBffContext, requireBffMutation, requireBffWorkspace } from "@/lib/bff/context";

type Params = { params: Promise<{ workspaceSlug: string; channelId: string; path?: string[] }> };
const caseId = (value: string) => /^HND-[A-Z0-9]{12}$/.test(value);

async function handle(request: NextRequest, { params }: Params, mutation: boolean) {
  try {
    const { workspaceSlug, channelId, path = [] } = await params;
    const { client, session } = await requireBffContext(request);
    const membership = requireBffWorkspace(session, workspaceSlug);
    let result;
    if (mutation) {
      requireBffMutation(request, session);
      if (path.length !== 2 || !caseId(path[0]) || path[1] !== "actions") throw new BffError(404, "not_found", "Action not found.");
      const payload = await readBffJson<HandoffActionRequest>(request);
      result = await client.actOnHandoffConversation(membership.workspaceId, channelId, path[0], {
        action: payload.action, ownership_version: payload.ownership_version, request_id: payload.request_id,
        text: payload.text, target: payload.target, cancel_pending: payload.cancel_pending,
      });
    } else if (!path.length) {
      const status = request.nextUrl.searchParams.get("status") === "all" ? "all" : "open";
      result = await client.listHandoffConversations(membership.workspaceId, channelId, status);
    } else if (path.length === 1 && caseId(path[0])) {
      result = await client.getHandoffConversation(membership.workspaceId, channelId, path[0], request.nextUrl.searchParams.get("before") || undefined);
    } else throw new BffError(404, "not_found", "Conversation not found.");
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return bffErrorResponse(error); }
}
export const GET = (request: NextRequest, params: Params) => handle(request, params, false);
export const POST = (request: NextRequest, params: Params) => handle(request, params, true);
