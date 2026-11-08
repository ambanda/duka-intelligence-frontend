import type { WorkspaceMessageEligibilityRequest } from "@duka/api-client";
import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, readBffJson, requireBffContext, requireBffMutation, requireBffWorkspace } from "@/lib/bff/context";

export async function POST(request: NextRequest, { params }: { params: Promise<{ workspaceSlug: string; channelId: string }> }) {
  try {
    const { workspaceSlug, channelId } = await params;
    const { client, session } = await requireBffContext(request);
    requireBffMutation(request, session);
    const membership = requireBffWorkspace(session, workspaceSlug);
    const payload = await readBffJson<WorkspaceMessageEligibilityRequest>(request);
    return NextResponse.json(await client.whatsappMessageEligibility(membership.workspaceId, channelId, payload));
  } catch (error) { return bffErrorResponse(error); }
}
