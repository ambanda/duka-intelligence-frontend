import type { ReactNode } from "react";

import { cn } from "./cn";

export interface StatusBadgeProps {
  children: ReactNode;
  className?: string;
  tone?: "neutral" | "success" | "warning" | "danger";
}

export function StatusBadge({ children, className, tone = "neutral" }: StatusBadgeProps) {
  return <span className={cn("duka-status", `duka-status--${tone}`, className)}>{children}</span>;
}
