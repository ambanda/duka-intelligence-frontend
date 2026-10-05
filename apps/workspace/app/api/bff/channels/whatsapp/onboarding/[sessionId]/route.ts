import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, readBffJson, requireBffContext, requireBffMutation } from "@/lib/bff/context";
import { sanitizeOnboarding } from "@/lib/channels/sanitize";

export async function GET(request: NextRequest, { params }: { params: Promise<{ sessionId: string }> }) {
  try {
    const { sessionId } = await params;
    const { client } = await requireBffContext(request);
    return NextResponse.json(sanitizeOnboarding(await client.getWhatsappOnboardingStatus(sessionId)));
  } catch (error) {
    return bffErrorResponse(error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ sessionId: string }> }) {
  try {
    const { sessionId } = await params;
    const { client, session } = await requireBffContext(request);
    requireBffMutation(request, session);
    const payload = await readBffJson<{ reason?: string }>(request);
    return NextResponse.json(sanitizeOnboarding(
      await client.cancelWhatsappOnboarding(sessionId, payload.reason),
    ));
  } catch (error) {
    return bffErrorResponse(error);
  }
}
