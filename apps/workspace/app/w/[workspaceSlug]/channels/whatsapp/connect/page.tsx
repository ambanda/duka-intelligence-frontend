import { PageHeader } from "@duka/ui";

import { MetaWhatsAppOnboarding } from "@/components/meta-whatsapp-onboarding";
import { requireWorkspace } from "@/lib/auth/workspace";

export const metadata = { title: "Connect WhatsApp" };

export default async function ConnectWhatsAppPage({ params, searchParams }: { params: Promise<{ workspaceSlug: string }>; searchParams: Promise<{ session?: string }> }) {
  const { workspaceSlug } = await params;
  const { session: initialSessionId } = await searchParams;
  const { membership, session } = await requireWorkspace(workspaceSlug);
  const canManage = membership.roles.some((role) => ["admin", "owner", "workspace_admin"].includes(role));

  return (
    <>
      <PageHeader eyebrow="Channels / WhatsApp" title="Connect WhatsApp" description="Authorize a Meta WhatsApp Business account for this workspace." />
      <MetaWhatsAppOnboarding canManage={canManage} csrfToken={session.csrfToken} initialSessionId={initialSessionId} sector={membership.sectors[0] ?? "general"} shopId={membership.shopIds[0] ?? "default"} workspaceSlug={workspaceSlug} />
    </>
  );
}
