import { PageHeader, StatusBadge } from "@duka/ui";
import { Bot, Cable, Database, ShieldCheck } from "lucide-react";

import { requireWorkspace } from "@/lib/auth/workspace";

export const metadata = { title: "Overview" };

export default async function OverviewPage({ params }: { params: Promise<{ workspaceSlug: string }> }) {
  const { workspaceSlug } = await params;
  const { membership } = await requireWorkspace(workspaceSlug);

  const summaries = [
    { icon: Database, label: "Knowledge scope", value: membership.sectors.length, detail: membership.sectors.join(", ") || "Not assigned" },
    { icon: Bot, label: "Permission sets", value: membership.permissionSets.length, detail: "Effective assignments" },
    { icon: Cable, label: "Locations", value: membership.shopIds.length, detail: "Authorized operational scopes" },
    { icon: ShieldCheck, label: "Roles", value: membership.roles.length, detail: membership.roles.join(", ").replaceAll("_", " ") },
  ];

  return (
    <>
      <PageHeader eyebrow="Workspace control plane" title="Overview" description="Operational status and authorized scope for this workspace." />
      <section className="summary-grid" aria-label="Workspace summary">
        {summaries.map(({ detail, icon: Icon, label, value }) => (
          <article className="summary-item" key={label}>
            <div className="summary-item__heading"><Icon aria-hidden="true" size={18} /><span>{label}</span></div>
            <strong>{value}</strong>
            <small>{detail}</small>
          </article>
        ))}
      </section>
      <section className="operational-section">
        <div className="section-heading">
          <div><h2>Readiness</h2><p>Configuration required before the workspace can serve users.</p></div>
          <StatusBadge tone="warning">Setup in progress</StatusBadge>
        </div>
        <div className="readiness-list">
          <div><span>Identity and membership</span><StatusBadge tone="success">Assigned</StatusBadge></div>
          <div><span>Knowledge sources</span><StatusBadge>Awaiting discovery API</StatusBadge></div>
          <div><span>Assistant skills</span><StatusBadge>Awaiting discovery API</StatusBadge></div>
          <div><span>Messaging channels</span><StatusBadge>Awaiting discovery API</StatusBadge></div>
        </div>
      </section>
    </>
  );
}
