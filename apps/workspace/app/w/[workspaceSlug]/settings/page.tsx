import { Settings } from "lucide-react";

import { WorkspaceSectionPage } from "@/components/workspace-section-page";

export const metadata = { title: "Settings" };

export default async function SettingsPage({ params }: { params: Promise<{ workspaceSlug: string }> }) {
  const { workspaceSlug } = await params;
  return <WorkspaceSectionPage eyebrow="Administration" title="Settings" description="Manage workspace identity, defaults, and operational policies." emptyTitle="Merchant collections" emptyDescription="Shop payment methods and collection history." actionHref={`/w/${workspaceSlug}/payments`} actionLabel="Shop payments" icon={Settings} />;
}
