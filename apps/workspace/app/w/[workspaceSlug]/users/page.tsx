import { PageHeader } from "@duka/ui";
import { requireWorkspace } from "@/lib/auth/workspace";
import { PeoplePanel } from "@/components/people-panel";

export const metadata = { title: "Users" };

export default async function UsersPage({ params }: { params: Promise<{ workspaceSlug: string }> }) {
  const { workspaceSlug } = await params;
  const { membership, session } = await requireWorkspace(workspaceSlug);
  const canManage = membership.roles.some((role) => ["owner", "admin", "workspace_admin"].includes(role));
  return <><PageHeader eyebrow="People and identity" title="Users" description="Contacts, customer journeys, consent and workspace access." />
    {canManage ? <PeoplePanel workspaceSlug={workspaceSlug} csrfToken={session.csrfToken} /> : <p>Administrator access is required.</p>}
  </>;
}
