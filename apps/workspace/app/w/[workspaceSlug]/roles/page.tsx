import { KeyRound } from "lucide-react";

import { WorkspaceSectionPage } from "@/components/workspace-section-page";

export const metadata = { title: "Roles" };

export default function RolesPage() {
  return <WorkspaceSectionPage eyebrow="Authorization" title="Roles" description="Review role and permission-set assignments for workspace users." emptyTitle="Role management is not connected" emptyDescription="Effective role assignments are enforced by the Duka control plane. Editing will be enabled only through audited, server-authorized operations." icon={KeyRound} />;
}
