import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, requireBffContext, requireBffMutation, requireBffWorkspace } from "@/lib/bff/context";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ workspaceSlug: string; channelId: string; templateRecordId: string }> },
) {
  try {
    const { workspaceSlug, channelId, templateRecordId } = await params;
    const { client, session } = await requireBffContext(request);
    requireBffMutation(request, session);
    const membership = requireBffWorkspace(session, workspaceSlug);
    await client.deleteWhatsappMessageTemplate(membership.workspaceId, channelId, templateRecordId);
    return new NextResponse(null, { status: 204 });
  } catch (error) { return bffErrorResponse(error); }
}
