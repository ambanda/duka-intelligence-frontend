import { PageHeader } from "@duka/ui";
import { ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";

import { requireServerSession } from "@/lib/auth/session";

export const metadata = { title: "Onboarding" };

export default async function OnboardingPage() {
  const session = await requireServerSession();
  const membership = session.memberships[0];
  if (!membership) {
    return (
      <main className="standalone-page">
        <PageHeader eyebrow="Workspace onboarding" title="No workspace assignment" description="Your identity is valid, but Duka has not assigned this principal to a workspace." />
        <p className="permission-message">Ask a Duka administrator to add your principal ID to an authorized workspace role.</p>
      </main>
    );
  }

  return (
    <main className="standalone-page">
      <PageHeader eyebrow="Workspace onboarding" title="Continue workspace setup" description="Review your assigned workspace and connect the services its users need." />
      <section className="onboarding-workspace">
        <Building2 size={22} />
        <div><strong>{membership.displayName}</strong><span>{membership.sectors.join(", ")}</span></div>
        <Link className="duka-button duka-button--primary" href={`/w/${membership.workspaceSlug}/overview`}>Open workspace <ArrowRight size={17} /></Link>
      </section>
    </main>
  );
}
