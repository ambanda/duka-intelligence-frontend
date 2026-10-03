import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, readBffJson, requireBffContext, requireBffMutation, requireBffWorkspace } from "@/lib/bff/context";
import { sanitizeMessageTemplate } from "@/lib/whatsapp-management/sanitize";

export async function POST(request: NextRequest, { params }: { params: Promise<{ workspaceSlug: string; channelId: string; templateRecordId: string }> }) {
  try {
    const { workspaceSlug, channelId, templateRecordId } = await params;
    const { client, session } = await requireBffContext(request);
    requireBffMutation(request, session);
    const membership = requireBffWorkspace(session, workspaceSlug);
    const payload = await readBffJson<{ idempotency_key: string }>(request);
    return NextResponse.json(sanitizeMessageTemplate(
      await client.submitWhatsappTemplateDraft(membership.workspaceId, channelId, templateRecordId, payload.idempotency_key),
    ));
  } catch (error) { return bffErrorResponse(error); }
}
