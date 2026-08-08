import { assertWorkspaceMembership, type ServerWorkspaceSession, type WorkspaceMembership } from "@duka/auth";
import { notFound } from "next/navigation";

import { requireServerSession } from "./session";

export interface WorkspaceContext {
  session: ServerWorkspaceSession;
  membership: WorkspaceMembership;
}

export async function requireWorkspace(workspaceSlug: string): Promise<WorkspaceContext> {
  const session = await requireServerSession();
  try {
    return { session, membership: assertWorkspaceMembership(session, workspaceSlug) };
  } catch {
    // Use a non-disclosing response for workspaces outside the principal's membership set.
    notFound();
  }
}
