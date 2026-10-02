import type { CreateWhatsAppTemplateDraftRequest } from "@duka/api-client";
import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, readBffJson, requireBffContext, requireBffMutation, requireBffWorkspace } from "@/lib/bff/context";
import { sanitizeMessageTemplate } from "@/lib/whatsapp-management/sanitize";

export async function POST(request: NextRequest, { params }: { params: Promise<{ workspaceSlug: string; channelId: string }> }) {
  try {
    const { workspaceSlug, channelId } = await params;
    const { client, session } = await requireBffContext(request);
    requireBffMutation(request, session);
    const membership = requireBffWorkspace(session, workspaceSlug);
    const payload = await readBffJson<CreateWhatsAppTemplateDraftRequest>(request);
    return NextResponse.json(sanitizeMessageTemplate(
      await client.createWhatsappTemplateDraft(membership.workspaceId, channelId, payload),
    ), { status: 201 });
  } catch (error) { return bffErrorResponse(error); }
}
