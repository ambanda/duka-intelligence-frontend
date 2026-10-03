import type { UpdateWhatsAppTemplateDraftRequest } from "@duka/api-client";
import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, readBffJson, requireBffContext, requireBffMutation, requireBffWorkspace } from "@/lib/bff/context";
import { sanitizeMessageTemplate } from "@/lib/whatsapp-management/sanitize";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ workspaceSlug: string; channelId: string; templateRecordId: string }> }) {
  try {
    const { workspaceSlug, channelId, templateRecordId } = await params;
    const { client, session } = await requireBffContext(request);
    requireBffMutation(request, session);
    const membership = requireBffWorkspace(session, workspaceSlug);
    const payload = await readBffJson<UpdateWhatsAppTemplateDraftRequest>(request);
    return NextResponse.json(sanitizeMessageTemplate(
      await client.updateWhatsappTemplateDraft(membership.workspaceId, channelId, templateRecordId, payload),
    ));
  } catch (error) { return bffErrorResponse(error); }
}
