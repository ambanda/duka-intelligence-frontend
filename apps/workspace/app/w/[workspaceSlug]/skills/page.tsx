import { PageHeader } from "@duka/ui";

import { SkillsPanel } from "@/components/skills-panel";
import { requireWorkspace } from "@/lib/auth/workspace";

export const metadata = { title: "Skills" };

export default async function SkillsPage({ params }: { params: Promise<{ workspaceSlug: string }> }) {
  const { workspaceSlug } = await params;
  const { membership } = await requireWorkspace(workspaceSlug);
  const canManage = membership.roles.some((role) => ["owner", "admin", "workspace_admin"].includes(role));
  return (
    <>
      <PageHeader description="Choose which approved capabilities this workspace can use, then configure their business rules and channel presentation." eyebrow="Agent capabilities" title="Skills" />
      <SkillsPanel canManage={canManage} workspaceSlug={workspaceSlug} />
    </>
  );
}
