import { PageHeader } from "@duka/ui";
import { requireWorkspace } from "@/lib/auth/workspace";
import { KnowledgePanel } from "@/components/knowledge-panel";

export const metadata = { title: "Knowledge" };

export default async function KnowledgePage({ params }: { params: Promise<{ workspaceSlug: string }> }) {
  const { workspaceSlug } = await params;
  const { membership, session } = await requireWorkspace(workspaceSlug);
  const canManage = membership.roles.some((role) => ["owner", "admin", "workspace_admin"].includes(role));
  return <><PageHeader eyebrow="Business knowledge" title="Knowledge" description="Business information, published answers, and connected sources." />
    {canManage ? <KnowledgePanel workspaceSlug={workspaceSlug} csrfToken={session.csrfToken} /> : <p>Contact your workspace administrator to manage business knowledge.</p>}
  </>;
}
