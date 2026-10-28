import type { CreateWhatsAppTemplateActivationRequest } from "@duka/api-client";
import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, readBffJson, requireBffContext, requireBffMutation, requireBffWorkspace } from "@/lib/bff/context";

export async function POST(request: NextRequest, { params }: { params: Promise<{ workspaceSlug: string; channelId: string; templateRecordId: string }> }) {
  try {
    const { workspaceSlug, channelId, templateRecordId } = await params;
    const { client, session } = await requireBffContext(request);
    requireBffMutation(request, session);
    const membership = requireBffWorkspace(session, workspaceSlug);
    const payload = await readBffJson<CreateWhatsAppTemplateActivationRequest>(request);
    return NextResponse.json(await client.createWhatsappTemplateActivation(membership.workspaceId, channelId, templateRecordId, payload), { status: 201 });
  } catch (error) { return bffErrorResponse(error); }
}
