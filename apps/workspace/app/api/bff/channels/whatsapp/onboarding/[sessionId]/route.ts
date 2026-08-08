import { NextRequest, NextResponse } from "next/server";

import { bffErrorResponse, requireBffContext } from "@/lib/bff/context";
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
