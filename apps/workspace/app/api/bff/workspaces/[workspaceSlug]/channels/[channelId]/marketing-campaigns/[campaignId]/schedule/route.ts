import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, requireBffContext, requireBffMutation, requireBffWorkspace } from "@/lib/bff/context";

export async function POST(request: NextRequest, { params }: { params: Promise<{ workspaceSlug: string; channelId: string; campaignId: string }> }) {
  try {
    const { workspaceSlug, channelId, campaignId } = await params;
    const { client, session } = await requireBffContext(request);
    requireBffMutation(request, session);
    const membership = requireBffWorkspace(session, workspaceSlug);
    return NextResponse.json(await client.scheduleWhatsappMarketingCampaign(membership.workspaceId, channelId, campaignId));
  } catch (error) { return bffErrorResponse(error); }
}
