import { Database } from "lucide-react";

import { WorkspaceSectionPage } from "@/components/workspace-section-page";

export const metadata = { title: "Data sources" };

export default function DataSourcesPage() {
  return <WorkspaceSectionPage eyebrow="Knowledge supply" title="Data sources" description="Monitor the systems and content sources that produce workspace knowledge." emptyTitle="No source inventory available" emptyDescription="Source health, freshness, and data quality will be exposed here through a scoped control-plane endpoint in a later phase." icon={Database} />;
}
