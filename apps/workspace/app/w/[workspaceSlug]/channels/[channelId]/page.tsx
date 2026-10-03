import { PageHeader } from "@duka/ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { WhatsAppChannelManagement } from "@/components/whatsapp-channel-management";
import { requireWorkspace } from "@/lib/auth/workspace";
import { canManageChannels } from "@/lib/channels/permissions";

export const metadata = { title: "WhatsApp operations" };

export default async function WhatsAppChannelPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; channelId: string }>;
}) {
  const { workspaceSlug, channelId } = await params;
  const { membership, session } = await requireWorkspace(workspaceSlug);

  return (
    <>
      <PageHeader
        actions={<Link className="duka-button duka-button--secondary" href={`/w/${workspaceSlug}/channels`}><ArrowLeft size={17} />All channels</Link>}
        description="Manage Meta templates and inspect message-delivery evidence for this connected channel."
        eyebrow="WhatsApp channel"
        title="WhatsApp operations"
      />
      <WhatsAppChannelManagement
        canManage={canManageChannels(membership.roles)}
        channelId={channelId}
        csrfToken={session.csrfToken}
        workspaceSlug={workspaceSlug}
      />
    </>
  );
}
