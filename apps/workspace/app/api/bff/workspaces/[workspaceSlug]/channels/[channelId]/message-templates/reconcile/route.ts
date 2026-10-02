import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, requireBffContext, requireBffMutation, requireBffWorkspace } from "@/lib/bff/context";

export async function POST(request: NextRequest, { params }: { params: Promise<{ workspaceSlug: string; channelId: string }> }) {
  try {
    const { workspaceSlug, channelId } = await params;
    const { client, session } = await requireBffContext(request);
    requireBffMutation(request, session);
    const membership = requireBffWorkspace(session, workspaceSlug);
    return NextResponse.json(
      await client.reconcileWhatsappMessageTemplates(membership.workspaceId, channelId),
    );
  } catch (error) { return bffErrorResponse(error); }
}
