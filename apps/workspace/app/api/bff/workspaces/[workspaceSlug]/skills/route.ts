import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, requireBffContext, requireBffWorkspace } from "@/lib/bff/context";
import { sanitizeSkills } from "@/lib/skills/sanitize";

export async function GET(request: NextRequest, { params }: { params: Promise<{ workspaceSlug: string }> }) {
  try {
    const { workspaceSlug } = await params;
    const { client, session } = await requireBffContext(request);
    const membership = requireBffWorkspace(session, workspaceSlug);
    return NextResponse.json(sanitizeSkills(await client.listSkills(membership.workspaceId)));
  } catch (error) {
    return bffErrorResponse(error);
  }
}
