import { EmptyState } from "@duka/ui";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

export function OperationalEmptyState({
  actionHref,
  actionLabel,
  description,
  icon: Icon,
  title,
}: {
  actionHref?: string;
  actionLabel?: string;
  description: string;
  icon: LucideIcon;
  title: string;
}) {
  return (
    <EmptyState
      action={actionHref && actionLabel ? <Link className="duka-button duka-button--secondary" href={actionHref}>{actionLabel}</Link> : null}
      description={description}
      icon={<Icon aria-hidden="true" size={22} />}
      title={title}
    />
  );
}
