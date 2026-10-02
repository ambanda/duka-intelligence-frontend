import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, requireBffContext, requireBffWorkspace } from "@/lib/bff/context";
import { sanitizeWhatsAppContacts } from "@/lib/whatsapp-management/sanitize";

export async function GET(request: NextRequest, { params }: { params: Promise<{ workspaceSlug: string; channelId: string }> }) {
  try {
    const { workspaceSlug, channelId } = await params;
    const { client, session } = await requireBffContext(request);
    const membership = requireBffWorkspace(session, workspaceSlug);
    return NextResponse.json(sanitizeWhatsAppContacts(
      await client.listWhatsappContacts(membership.workspaceId, channelId),
    ));
  } catch (error) { return bffErrorResponse(error); }
}
