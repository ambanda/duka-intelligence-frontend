import { PageHeader } from "@duka/ui";
import { Plus } from "lucide-react";
import Link from "next/link";

import { ChannelsPanel } from "@/components/channels-panel";
import { requireWorkspace } from "@/lib/auth/workspace";
import { canManageChannels } from "@/lib/channels/permissions";

export const metadata = { title: "Channels" };

export default async function ChannelsPage({ params }: { params: Promise<{ workspaceSlug: string }> }) {
  const { workspaceSlug } = await params;
  const { membership, session } = await requireWorkspace(workspaceSlug);

  return (
    <>
      <PageHeader
        actions={<Link className="duka-button duka-button--primary" href={`/w/${workspaceSlug}/channels/whatsapp/connect`}><Plus size={17} />Connect channel</Link>}
        description="Connect and monitor the messaging accounts through which users reach this workspace."
        eyebrow="Access channels"
        title="Channels"
      />
      <ChannelsPanel canManage={canManageChannels(membership.roles)} csrfToken={session.csrfToken} workspaceSlug={workspaceSlug} />
    </>
  );
}
