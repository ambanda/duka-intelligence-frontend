import { assertWorkspaceMembership, findWorkspaceMembership, type WorkspaceSession } from "@duka/auth";
import { describe, expect, it } from "vitest";

const session: WorkspaceSession = {
  authMode: "oidc",
  csrfToken: "csrf",
  expiresAt: "2030-01-01T00:00:00Z",
  principal: { principalId: "p1", subject: "sub1", email: null, displayName: null },
  memberships: [{
    tenantId: "tenant-a", clientId: "client-a", workspaceId: "workspace-a", workspaceSlug: "workspace-a",
    organizationId: "org-a", displayName: "Workspace A", sectors: ["sacco"], shopIds: ["hq"],
    roles: ["workspace_admin"], permissionSets: ["workspace_manage"],
  }],
};

describe("workspace authorization", () => {
  it("resolves only an assigned workspace", () => {
    expect(findWorkspaceMembership(session, "workspace-a")?.tenantId).toBe("tenant-a");
    expect(findWorkspaceMembership(session, "workspace-b")).toBeNull();
  });

  it("rejects a modified workspace slug", () => {
    expect(() => assertWorkspaceMembership(session, "workspace-b")).toThrow("not assigned");
  });
});
