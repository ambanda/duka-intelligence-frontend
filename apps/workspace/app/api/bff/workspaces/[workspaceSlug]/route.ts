import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, requireBffContext, requireBffWorkspace } from "@/lib/bff/context";

export async function GET(request: NextRequest, { params }: { params: Promise<{ workspaceSlug: string }> }) {
  try {
    const { workspaceSlug } = await params;
    const { client, session } = await requireBffContext(request);
    const membership = requireBffWorkspace(session, workspaceSlug);
    if (session.authMode === "development") return NextResponse.json({ workspace: membership });
    return NextResponse.json(await client.getWorkspace(membership.workspaceId));
  } catch (error) {
    return bffErrorResponse(error);
  }
}
