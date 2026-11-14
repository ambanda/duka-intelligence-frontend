import { PageHeader } from "@duka/ui";
import { requireWorkspace } from "@/lib/auth/workspace";
import { DataSourcesPanel } from "@/components/data-sources-panel";

export const metadata = { title: "Data sources" };

export default async function DataSourcesPage({ params }: { params: Promise<{ workspaceSlug: string }> }) {
  const { workspaceSlug } = await params;
  const { membership, session } = await requireWorkspace(workspaceSlug);
  const canManage = membership.roles.some((role) => ["owner", "admin", "workspace_admin"].includes(role));
  return <><PageHeader eyebrow="Knowledge supply" title="Data sources" description="Managed content, synchronized systems and authorized live connections." />
    {canManage ? <DataSourcesPanel workspaceSlug={workspaceSlug} csrfToken={session.csrfToken} /> : <p>Administrator access is required.</p>}
  </>;
}
