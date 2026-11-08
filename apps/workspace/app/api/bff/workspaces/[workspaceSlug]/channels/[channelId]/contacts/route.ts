import type { CreateWhatsAppContactRequest } from "@duka/api-client";
import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, readBffJson, requireBffContext, requireBffMutation, requireBffWorkspace } from "@/lib/bff/context";
import { sanitizeWhatsAppContact, sanitizeWhatsAppContacts } from "@/lib/whatsapp-management/sanitize";

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

export async function POST(request: NextRequest, { params }: { params: Promise<{ workspaceSlug: string; channelId: string }> }) {
  try {
    const { workspaceSlug, channelId } = await params;
    const { client, session } = await requireBffContext(request);
    requireBffMutation(request, session);
    const membership = requireBffWorkspace(session, workspaceSlug);
    const payload = await readBffJson<CreateWhatsAppContactRequest>(request);
    const result = await client.createWhatsappContact(membership.workspaceId, channelId, payload);
    return NextResponse.json({
      contact: sanitizeWhatsAppContact(result.contact),
      created: result.created,
      consent_outcome: result.consent_outcome,
    }, { status: result.created ? 201 : 200 });
  } catch (error) { return bffErrorResponse(error); }
}
