import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, requireBffContext, requireBffWorkspace } from "@/lib/bff/context";

export async function GET(request: NextRequest, { params }: { params: Promise<{ workspaceSlug: string; channelId: string; activationId: string }> }) {
  try {
    const { workspaceSlug, channelId, activationId } = await params;
    const { client, session } = await requireBffContext(request);
    const membership = requireBffWorkspace(session, workspaceSlug);
    return NextResponse.json(await client.getWhatsappTemplateActivation(membership.workspaceId, channelId, activationId));
  } catch (error) { return bffErrorResponse(error); }
}
