import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, requireBffContext } from "@/lib/bff/context";

export async function GET(request: NextRequest) {
  try {
    const { client, session } = await requireBffContext(request);
    if (session.authMode === "development") {
      return NextResponse.json({
        principal_id: session.principal.principalId,
        email: session.principal.email,
        display_name: session.principal.displayName,
        workspace_count: session.memberships.length,
      });
    }
    return NextResponse.json(await client.getMe());
  } catch (error) {
    return bffErrorResponse(error);
  }
}
