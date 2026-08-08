import type { ServerWorkspaceSession } from "@duka/auth";
import { redirect } from "next/navigation";

import { readSessionCookie } from "./cookies";

function developmentSession(): ServerWorkspaceSession | null {
  if (process.env.NODE_ENV === "production" || process.env.WORKSPACE_AUTH_MODE !== "development") {
    return null;
  }

  const workspaceId = process.env.DUKA_DEV_WORKSPACE_ID ?? "workspace_local";
  return {
    accessToken: "",
    accessTokenExpiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    authMode: "development",
    csrfToken: "development-csrf-token",
    expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    idToken: null,
    refreshToken: null,
    principal: {
      principalId: process.env.DUKA_DEV_PRINCIPAL_ID ?? "principal_local_admin",
      subject: process.env.DUKA_DEV_PRINCIPAL_ID ?? "principal_local_admin",
      email: process.env.DUKA_DEV_PRINCIPAL_EMAIL ?? "admin@example.com",
      displayName: process.env.DUKA_DEV_PRINCIPAL_NAME ?? "Local Workspace Admin",
    },
    memberships: [
      {
        tenantId: process.env.DUKA_DEV_TENANT_ID ?? "tenant_local",
        clientId: process.env.DUKA_DEV_CLIENT_ID ?? "client_local",
        workspaceId,
        workspaceSlug: process.env.DUKA_DEV_WORKSPACE_SLUG ?? "demo-workspace",
        organizationId: process.env.DUKA_DEV_ORGANIZATION_ID ?? "organization_local",
        displayName: process.env.DUKA_DEV_WORKSPACE_NAME ?? "Demo Workspace",
        sectors: [process.env.DUKA_DEV_SECTOR ?? "sacco"],
        shopIds: [process.env.DUKA_DEV_SHOP_ID ?? "default"],
        roles: [process.env.DUKA_DEV_ROLE ?? "workspace_admin"],
        permissionSets: [process.env.DUKA_DEV_PERMISSION_SET ?? "workspace_manage"],
      },
    ],
  };
}

export async function getServerSession(): Promise<ServerWorkspaceSession | null> {
  return developmentSession() ?? readSessionCookie();
}

export async function requireServerSession(): Promise<ServerWorkspaceSession> {
  const session = await getServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  return session;
}
