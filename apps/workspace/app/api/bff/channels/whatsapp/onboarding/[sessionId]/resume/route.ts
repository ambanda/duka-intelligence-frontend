import { NextRequest, NextResponse } from "next/server";

import { BffError, bffErrorResponse, readBffJson, requireBffContext, requireBffMutation } from "@/lib/bff/context";
import { sanitizeOnboarding } from "@/lib/channels/sanitize";

export async function POST(request: NextRequest, { params }: { params: Promise<{ sessionId: string }> }) {
  try {
    const { sessionId } = await params;
    const { client, session } = await requireBffContext(request);
    requireBffMutation(request, session);
    const body = await readBffJson<{ registration_pin?: string }>(request);
    if (!body.registration_pin || !/^\d{6}$/.test(body.registration_pin)) {
      throw new BffError(400, "registration_pin_invalid", "Registration PIN must contain six digits.");
    }
    return NextResponse.json(sanitizeOnboarding(await client.resumeWhatsappOnboarding(sessionId, body.registration_pin)), { status: 202 });
  } catch (error) {
    return bffErrorResponse(error);
  }
}
