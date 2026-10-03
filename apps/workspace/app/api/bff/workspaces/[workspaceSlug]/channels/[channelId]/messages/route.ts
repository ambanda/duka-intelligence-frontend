import type { SendWorkspaceWhatsAppTemplateRequest } from "@duka/api-client";
import { NextRequest, NextResponse } from "next/server";

import {
  bffErrorResponse,
  readBffJson,
  requireBffContext,
  requireBffMutation,
  requireBffWorkspace,
} from "@/lib/bff/context";
import { sanitizeWorkspaceMessage, sanitizeWorkspaceMessages } from "@/lib/whatsapp-management/sanitize";

type RouteParams = { params: Promise<{ workspaceSlug: string; channelId: string }> };

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { workspaceSlug, channelId } = await params;
    const { client, session } = await requireBffContext(request);
    const membership = requireBffWorkspace(session, workspaceSlug);
    return NextResponse.json(sanitizeWorkspaceMessages(
      await client.listWorkspaceWhatsappMessages(membership.workspaceId, channelId),
    ));
  } catch (error) { return bffErrorResponse(error); }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { workspaceSlug, channelId } = await params;
    const { client, session } = await requireBffContext(request);
    requireBffMutation(request, session);
    const membership = requireBffWorkspace(session, workspaceSlug);
    const payload = await readBffJson<SendWorkspaceWhatsAppTemplateRequest>(request);
    return NextResponse.json(
      sanitizeWorkspaceMessage(
        await client.sendWorkspaceWhatsappTemplate(membership.workspaceId, channelId, payload),
      ),
      { status: 202 },
    );
  } catch (error) { return bffErrorResponse(error); }
}
