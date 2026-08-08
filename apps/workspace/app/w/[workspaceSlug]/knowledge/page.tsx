import { BookOpenText } from "lucide-react";

import { WorkspaceSectionPage } from "@/components/workspace-section-page";

export const metadata = { title: "Knowledge" };

export default function KnowledgePage() {
  return <WorkspaceSectionPage eyebrow="Governed intelligence" title="Knowledge" description="Inspect the knowledge objects authorized for this workspace." emptyTitle="Knowledge discovery is not connected" emptyDescription="Knowledge inventory will appear here after OIDC-backed discovery is enabled. Objects remain governed by the Duka API and are never inferred from browser claims." icon={BookOpenText} />;
}
