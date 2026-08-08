import type { ReactNode } from "react";

import { WorkspaceShell } from "@/components/workspace-shell";
import { requireWorkspace } from "@/lib/auth/workspace";

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;
  const { membership, session } = await requireWorkspace(workspaceSlug);
  return <WorkspaceShell membership={membership} session={session}>{children}</WorkspaceShell>;
}
