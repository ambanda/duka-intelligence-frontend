import { Activity } from "lucide-react";

import { WorkspaceSectionPage } from "@/components/workspace-section-page";

export const metadata = { title: "Audit" };

export default function AuditPage() {
  return <WorkspaceSectionPage eyebrow="Accountability" title="Audit" description="Review channel, access, tool, and administrative events for this workspace." emptyTitle="No audit events loaded" emptyDescription="Audited events will be queried from the serving control plane with workspace scope applied server-side." icon={Activity} />;
}
