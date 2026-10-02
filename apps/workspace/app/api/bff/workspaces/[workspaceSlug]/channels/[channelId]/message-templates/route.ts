import type { CreateWhatsAppMessageTemplateRequest } from "@duka/api-client";
import { NextRequest, NextResponse } from "next/server";

import {
  bffErrorResponse,
  readBffJson,
  requireBffContext,
  requireBffMutation,
  requireBffWorkspace,
} from "@/lib/bff/context";
import { sanitizeMessageTemplate, sanitizeMessageTemplates } from "@/lib/whatsapp-management/sanitize";

type RouteParams = { params: Promise<{ workspaceSlug: string; channelId: string }> };

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { workspaceSlug, channelId } = await params;
    const { client, session } = await requireBffContext(request);
    const membership = requireBffWorkspace(session, workspaceSlug);
    return NextResponse.json(sanitizeMessageTemplates(
      await client.listWhatsappMessageTemplates(membership.workspaceId, channelId),
    ));
  } catch (error) { return bffErrorResponse(error); }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { workspaceSlug, channelId } = await params;
    const { client, session } = await requireBffContext(request);
    requireBffMutation(request, session);
    const membership = requireBffWorkspace(session, workspaceSlug);
    const payload = await readBffJson<CreateWhatsAppMessageTemplateRequest>(request);
    return NextResponse.json(
      sanitizeMessageTemplate(
        await client.createWhatsappMessageTemplate(membership.workspaceId, channelId, payload),
      ),
      { status: 201 },
    );
  } catch (error) { return bffErrorResponse(error); }
}
