export type AuthMode = "oidc" | "development";

export interface WorkspaceMembership {
  tenantId: string;
  clientId: string | null;
  workspaceId: string;
  workspaceSlug: string;
  organizationId: string | null;
  displayName: string;
  sectors: string[];
  shopIds: string[];
  roles: string[];
  permissionSets: string[];
}

export interface AuthenticatedPrincipal {
  principalId: string;
  subject: string;
  email: string | null;
  displayName: string | null;
}

export interface WorkspaceSession {
  principal: AuthenticatedPrincipal;
  memberships: WorkspaceMembership[];
  expiresAt: string;
  authMode: AuthMode;
  csrfToken: string;
}

export interface ServerWorkspaceSession extends WorkspaceSession {
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string | null;
  idToken: string | null;
}

export class WorkspaceAuthorizationError extends Error {
  readonly code = "workspace_access_denied";

  constructor(message = "The principal is not assigned to this workspace.") {
    super(message);
    this.name = "WorkspaceAuthorizationError";
  }
}

export function findWorkspaceMembership(session: WorkspaceSession, workspaceSlug: string): WorkspaceMembership | null {
  return session.memberships.find((membership) => membership.workspaceSlug === workspaceSlug) ?? null;
}

export function assertWorkspaceMembership(session: WorkspaceSession, workspaceSlug: string): WorkspaceMembership {
  const membership = findWorkspaceMembership(session, workspaceSlug);
  if (!membership) {
    throw new WorkspaceAuthorizationError();
  }
  return membership;
}

export function toPublicSession(session: ServerWorkspaceSession): WorkspaceSession {
  const {
    accessToken: _accessToken,
    accessTokenExpiresAt: _accessTokenExpiresAt,
    idToken: _idToken,
    refreshToken: _refreshToken,
    ...publicSession
  } = session;
  return publicSession;
}
