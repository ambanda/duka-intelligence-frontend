import type { WorkspaceSkillDraftInput } from "@duka/api-client";
import { NextRequest, NextResponse } from "next/server";
import { bffErrorResponse, readBffJson, requireBffContext, requireBffMutation, requireBffWorkspace } from "@/lib/bff/context";
import { sanitizeSkillDetail } from "@/lib/skills/sanitize";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ workspaceSlug: string; skillId: string }> }) {
  try {
    const { workspaceSlug, skillId } = await params;
    const { client, session } = await requireBffContext(request);
    requireBffMutation(request, session);
    const membership = requireBffWorkspace(session, workspaceSlug);
    const payload = await readBffJson<WorkspaceSkillDraftInput>(request);
    return NextResponse.json(sanitizeSkillDetail(await client.saveSkillDraft(membership.workspaceId, skillId, payload)));
  } catch (error) { return bffErrorResponse(error); }
}
