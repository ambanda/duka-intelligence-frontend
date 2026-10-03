import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, requireBffContext, requireBffWorkspace } from "@/lib/bff/context";
import { sanitizeWorkspaceMessage } from "@/lib/whatsapp-management/sanitize";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ workspaceSlug: string; channelId: string; requestId: string }> },
) {
  try {
    const { workspaceSlug, channelId, requestId } = await params;
    const { client, session } = await requireBffContext(request);
    const membership = requireBffWorkspace(session, workspaceSlug);
    return NextResponse.json(sanitizeWorkspaceMessage(
      await client.getWorkspaceWhatsappMessage(membership.workspaceId, channelId, requestId),
    ));
  } catch (error) { return bffErrorResponse(error); }
}
