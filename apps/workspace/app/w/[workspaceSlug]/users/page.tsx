import { Users } from "lucide-react";

import { WorkspaceSectionPage } from "@/components/workspace-section-page";

export const metadata = { title: "Users" };

export default function UsersPage() {
  return <WorkspaceSectionPage eyebrow="Workspace access" title="Users" description="Manage principals authorized to use this workspace and its channels." emptyTitle="User administration is not connected" emptyDescription="Assigned principals will appear after the authenticated user-management contract is available. Channel allowlists remain authoritative in Duka." icon={Users} />;
}
