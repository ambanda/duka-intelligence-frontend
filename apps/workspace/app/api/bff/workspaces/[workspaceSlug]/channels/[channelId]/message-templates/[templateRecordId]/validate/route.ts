import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, requireBffContext, requireBffMutation, requireBffWorkspace } from "@/lib/bff/context";

export async function POST(request: NextRequest, { params }: { params: Promise<{ workspaceSlug: string; channelId: string; templateRecordId: string }> }) {
  try {
    const { workspaceSlug, channelId, templateRecordId } = await params;
    const { client, session } = await requireBffContext(request);
    requireBffMutation(request, session);
    const membership = requireBffWorkspace(session, workspaceSlug);
    return NextResponse.json(await client.validateWhatsappTemplateDraft(membership.workspaceId, channelId, templateRecordId));
  } catch (error) { return bffErrorResponse(error); }
}
