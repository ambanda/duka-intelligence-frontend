import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, readBffJson, requireBffContext, requireBffMutation, requireBffWorkspace } from "@/lib/bff/context";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ workspaceSlug: string; channelId: string; contactId: string }> }) {
  try {
    const { workspaceSlug, channelId, contactId } = await params;
    const { client, session } = await requireBffContext(request);
    requireBffMutation(request, session);
    const membership = requireBffWorkspace(session, workspaceSlug);
    const payload = await readBffJson<{ tag_keys: string[] }>(request);
    return NextResponse.json(await client.assignWhatsappContactTags(membership.workspaceId, channelId, contactId, payload.tag_keys));
  } catch (error) { return bffErrorResponse(error); }
}
