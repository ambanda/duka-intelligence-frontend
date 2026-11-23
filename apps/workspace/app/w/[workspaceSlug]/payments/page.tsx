import { PageHeader } from "@duka/ui";
import { ShopPayments } from "@/components/shop-payments";
import { requireWorkspace } from "@/lib/auth/workspace";
export const metadata = { title: "Shop payments" };
export default async function PaymentsPage({ params }: { params: Promise<{ workspaceSlug: string }> }) {
  const { workspaceSlug } = await params;
  const { session } = await requireWorkspace(workspaceSlug);
  return <><PageHeader eyebrow="Merchant collections" title="Shop payments" description="Merchant accounts, shop payment methods and collection evidence." /><ShopPayments workspaceSlug={workspaceSlug} csrfToken={session.csrfToken} /></>;
}
