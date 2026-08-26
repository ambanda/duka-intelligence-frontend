import type { CreateOnboardingSessionRequest } from "@duka/api-client";
import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, readBffJson, requireBffContext, requireBffMutation, requireBffWorkspace } from "@/lib/bff/context";

export async function POST(request: NextRequest, { params }: { params: Promise<{ workspaceSlug: string }> }) {
  try {
    const { workspaceSlug } = await params;
    const { client, session } = await requireBffContext(request);
    requireBffMutation(request, session);
    const membership = requireBffWorkspace(session, workspaceSlug);
    const body = await readBffJson<CreateOnboardingSessionRequest>(request);
    const sector = body.sector && membership.sectors.includes(body.sector) ? body.sector : membership.sectors[0];
    const shopId = body.shop_id && membership.shopIds.includes(body.shop_id) ? body.shop_id : membership.shopIds[0];
    return NextResponse.json(
      await client.createWhatsappOnboardingSession(membership.workspaceId, { sector, shop_id: shopId }),
      { status: 201 },
    );
  } catch (error) {
    return bffErrorResponse(error);
  }
}
