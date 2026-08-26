import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, readBffJson, requireBffContext, requireBffMutation, requireBffWorkspace } from "@/lib/bff/context";
import { sanitizeChannel } from "@/lib/channels/sanitize";

export async function GET(request: NextRequest, { params }: { params: Promise<{ workspaceSlug: string; channelId: string }> }) {
  try {
    const { workspaceSlug, channelId } = await params;
    const { client, session } = await requireBffContext(request);
    const membership = requireBffWorkspace(session, workspaceSlug);
    return NextResponse.json(sanitizeChannel((await client.getChannel(membership.workspaceId, channelId)).channel));
  } catch (error) {
    return bffErrorResponse(error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ workspaceSlug: string; channelId: string }> }) {
  try {
    const { workspaceSlug, channelId } = await params;
    const { client, session } = await requireBffContext(request);
    requireBffMutation(request, session);
    const membership = requireBffWorkspace(session, workspaceSlug);
    const body = await readBffJson<{ reason?: string }>(request);
    await client.disconnectChannel(membership.workspaceId, channelId, body.reason);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return bffErrorResponse(error);
  }
}
