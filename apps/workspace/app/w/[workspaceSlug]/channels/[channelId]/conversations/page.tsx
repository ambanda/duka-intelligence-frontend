import { PageHeader } from "@duka/ui";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireWorkspace } from "@/lib/auth/workspace";
import { HandoffConversations } from "@/components/handoff-conversations";

export const metadata = { title: "Conversations" };
export default async function ConversationsPage({ params, searchParams }: {
  params: Promise<{ workspaceSlug: string; channelId: string }>;
  searchParams: Promise<{ case?: string }>;
}) {
  const { workspaceSlug, channelId } = await params;
  const { session } = await requireWorkspace(workspaceSlug);
  const selected = (await searchParams).case;
  return <>
    <PageHeader title="Conversations" eyebrow="Human handoff" actions={<Link className="duka-button duka-button--secondary" href={`/w/${workspaceSlug}/channels`}><ArrowLeft size={17} />Channels</Link>} />
    <HandoffConversations workspaceSlug={workspaceSlug} channelId={channelId} csrfToken={session.csrfToken} initialCase={selected} />
  </>;
}
