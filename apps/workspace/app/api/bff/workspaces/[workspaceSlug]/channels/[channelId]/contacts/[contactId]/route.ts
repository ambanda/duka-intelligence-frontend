import type { UpdateWhatsAppContactRequest } from "@duka/api-client";
import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, readBffJson, requireBffContext, requireBffMutation, requireBffWorkspace } from "@/lib/bff/context";
import { sanitizeWhatsAppContact } from "@/lib/whatsapp-management/sanitize";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ workspaceSlug: string; channelId: string; contactId: string }> }) {
  try {
    const { workspaceSlug, channelId, contactId } = await params;
    const { client, session } = await requireBffContext(request);
    requireBffMutation(request, session);
    const membership = requireBffWorkspace(session, workspaceSlug);
    const payload = await readBffJson<UpdateWhatsAppContactRequest>(request);
    return NextResponse.json(sanitizeWhatsAppContact(await client.updateWhatsappContact(membership.workspaceId, channelId, contactId, payload)));
  } catch (error) { return bffErrorResponse(error); }
}
