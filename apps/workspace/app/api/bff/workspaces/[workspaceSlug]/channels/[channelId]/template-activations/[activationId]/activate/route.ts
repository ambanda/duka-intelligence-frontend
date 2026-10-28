import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, requireBffContext, requireBffMutation, requireBffWorkspace } from "@/lib/bff/context";

export async function POST(request: NextRequest, { params }: { params: Promise<{ workspaceSlug: string; channelId: string; activationId: string }> }) {
  try {
    const { workspaceSlug, channelId, activationId } = await params;
    const { client, session } = await requireBffContext(request);
    requireBffMutation(request, session);
    const membership = requireBffWorkspace(session, workspaceSlug);
    return NextResponse.json(await client.activateWhatsappTemplateActivation(membership.workspaceId, channelId, activationId));
  } catch (error) { return bffErrorResponse(error); }
}
