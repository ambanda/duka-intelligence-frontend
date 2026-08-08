import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, requireBffContext } from "@/lib/bff/context";

export async function GET(request: NextRequest) {
  try {
    const { client, session } = await requireBffContext(request);
    if (session.authMode === "development") {
      return NextResponse.json({
        principal_id: session.principal.principalId,
        workspaces: session.memberships.map((membership) => ({
          tenant_id: membership.tenantId,
          client_id: membership.clientId,
          workspace_id: membership.workspaceId,
          organization_id: membership.organizationId,
          sectors: membership.sectors,
          shop_ids: membership.shopIds,
          roles: membership.roles,
          permission_sets: membership.permissionSets,
          channel_count: 0,
        })),
      });
    }
    return NextResponse.json(await client.listWorkspaces());
  } catch (error) {
    return bffErrorResponse(error);
  }
}
