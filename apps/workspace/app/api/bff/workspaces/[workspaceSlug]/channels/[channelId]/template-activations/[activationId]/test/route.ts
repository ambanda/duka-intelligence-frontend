import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, readBffJson, requireBffContext, requireBffMutation, requireBffWorkspace } from "@/lib/bff/context";

export async function POST(request: NextRequest, { params }: { params: Promise<{ workspaceSlug: string; channelId: string; activationId: string }> }) {
  try {
    const { workspaceSlug, channelId, activationId } = await params;
    const { client, session } = await requireBffContext(request);
    requireBffMutation(request, session);
    const membership = requireBffWorkspace(session, workspaceSlug);
    const payload = await readBffJson<{ contact_id: string; campaign_values: Record<string, unknown>; idempotency_key: string }>(request);
    return NextResponse.json(await client.testWhatsappTemplateActivation(membership.workspaceId, channelId, activationId, payload));
  } catch (error) { return bffErrorResponse(error); }
}
