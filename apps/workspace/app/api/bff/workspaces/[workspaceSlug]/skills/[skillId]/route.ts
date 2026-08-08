import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, requireBffContext, requireBffWorkspace } from "@/lib/bff/context";
import { sanitizeSkillDetail } from "@/lib/skills/sanitize";

export async function GET(request: NextRequest, { params }: { params: Promise<{ workspaceSlug: string; skillId: string }> }) {
  try {
    const { workspaceSlug, skillId } = await params;
    const { client, session } = await requireBffContext(request);
    const membership = requireBffWorkspace(session, workspaceSlug);
    return NextResponse.json(sanitizeSkillDetail(await client.getSkill(membership.workspaceId, skillId)));
  } catch (error) {
    return bffErrorResponse(error);
  }
}
