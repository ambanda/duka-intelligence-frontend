import { PageHeader } from "@duka/ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { SkillConfiguration } from "@/components/skill-configuration";
import { requireWorkspace } from "@/lib/auth/workspace";
import { humanize } from "@/lib/skills/display";

export default async function SkillPage({ params }: { params: Promise<{ workspaceSlug: string; skillId: string }> }) {
  const { workspaceSlug, skillId } = await params;
  const { membership, session } = await requireWorkspace(workspaceSlug);
  const canManage = membership.roles.some((role) => ["owner", "admin", "workspace_admin"].includes(role));
  return (
    <>
      <PageHeader actions={<Link className="duka-button duka-button--secondary" href={`/w/${workspaceSlug}/skills`}><ArrowLeft size={17} />All skills</Link>} description="Configure reviewed business rules and channel presentation before making this capability available." eyebrow="Workspace skill" title={humanize(skillId.split(".").at(-1) || skillId)} />
      <SkillConfiguration canManage={canManage} csrfToken={session.csrfToken} skillId={skillId} workspaceSlug={workspaceSlug} />
    </>
  );
}
