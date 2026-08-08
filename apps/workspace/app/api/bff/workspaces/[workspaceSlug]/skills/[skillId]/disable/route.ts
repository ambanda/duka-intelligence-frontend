import { NextRequest, NextResponse } from "next/server";
import { bffErrorResponse, requireBffContext, requireBffMutation, requireBffWorkspace } from "@/lib/bff/context";
import { sanitizeSkillDetail } from "@/lib/skills/sanitize";

export async function POST(request: NextRequest, { params }: { params: Promise<{ workspaceSlug: string; skillId: string }> }) {
  try {
    const { workspaceSlug, skillId } = await params;
    const { client, session } = await requireBffContext(request);
    requireBffMutation(request, session);
    const membership = requireBffWorkspace(session, workspaceSlug);
    return NextResponse.json(sanitizeSkillDetail(await client.disableSkill(membership.workspaceId, skillId)));
  } catch (error) { return bffErrorResponse(error); }
}
