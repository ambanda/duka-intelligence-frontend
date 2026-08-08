import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, requireBffContext, requireBffWorkspace } from "@/lib/bff/context";
import { sanitizeWorkspaceChannels } from "@/lib/channels/sanitize";

export async function GET(request: NextRequest, { params }: { params: Promise<{ workspaceSlug: string }> }) {
  try {
    const { workspaceSlug } = await params;
    const { client, session } = await requireBffContext(request);
    const membership = requireBffWorkspace(session, workspaceSlug);
    if (session.authMode === "development") {
      return NextResponse.json({ workspace_id: membership.workspaceId, channels: [], pending_onboarding_sessions: [] });
    }
    return NextResponse.json(sanitizeWorkspaceChannels(await client.listChannels(membership.workspaceId)));
  } catch (error) {
    return bffErrorResponse(error);
  }
}
