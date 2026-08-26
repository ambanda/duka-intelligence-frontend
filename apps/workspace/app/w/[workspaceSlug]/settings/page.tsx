import { Settings } from "lucide-react";

import { WorkspaceSectionPage } from "@/components/workspace-section-page";

export const metadata = { title: "Settings" };

export default function SettingsPage() {
  return <WorkspaceSectionPage eyebrow="Administration" title="Settings" description="Manage workspace identity, defaults, and operational policies." emptyTitle="Settings are read-only for now" emptyDescription="Configuration changes will be introduced as explicit audited commands after authentication and authorization are complete." icon={Settings} />;
}
