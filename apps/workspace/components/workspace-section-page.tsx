import { PageHeader } from "@duka/ui";
import type { LucideIcon } from "lucide-react";

import { OperationalEmptyState } from "./operational-empty-state";

export function WorkspaceSectionPage({
  actionHref,
  actionLabel,
  description,
  emptyDescription,
  emptyTitle,
  eyebrow,
  icon,
  title,
}: {
  actionHref?: string;
  actionLabel?: string;
  description: string;
  emptyDescription: string;
  emptyTitle: string;
  eyebrow: string;
  icon: LucideIcon;
  title: string;
}) {
  return (
    <>
      <PageHeader description={description} eyebrow={eyebrow} title={title} />
      <OperationalEmptyState actionHref={actionHref} actionLabel={actionLabel} description={emptyDescription} icon={icon} title={emptyTitle} />
    </>
  );
}
