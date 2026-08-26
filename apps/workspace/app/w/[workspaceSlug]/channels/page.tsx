import { PageHeader } from "@duka/ui";
import { Plus } from "lucide-react";
import Link from "next/link";

import { ChannelsPanel } from "@/components/channels-panel";
import { requireWorkspace } from "@/lib/auth/workspace";

export const metadata = { title: "Channels" };

export default async function ChannelsPage({ params }: { params: Promise<{ workspaceSlug: string }> }) {
  const { workspaceSlug } = await params;
  const { session } = await requireWorkspace(workspaceSlug);

  return (
    <>
      <PageHeader
        actions={<Link className="duka-button duka-button--primary" href={`/w/${workspaceSlug}/channels/whatsapp/connect`}><Plus size={17} />Connect channel</Link>}
        description="Connect and monitor the messaging accounts through which users reach this workspace."
        eyebrow="Access channels"
        title="Channels"
      />
      <ChannelsPanel csrfToken={session.csrfToken} workspaceSlug={workspaceSlug} />
    </>
  );
}
