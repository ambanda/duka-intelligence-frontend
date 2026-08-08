import type { CompleteEmbeddedSignupRequest } from "@duka/api-client";
import { NextRequest, NextResponse } from "next/server";

import { BffError, bffErrorResponse, readBffJson, requireBffContext, requireBffMutation } from "@/lib/bff/context";
import { sanitizeOnboarding } from "@/lib/channels/sanitize";

export async function POST(request: NextRequest) {
  try {
    const { client, session } = await requireBffContext(request);
    requireBffMutation(request, session);
    const body = await readBffJson<CompleteEmbeddedSignupRequest>(request);
    if (!body.session_id || !body.state || !body.authorization_code || !body.waba_id || !body.phone_number_id) {
      throw new BffError(400, "embedded_signup_payload_invalid", "Meta onboarding information is incomplete.");
    }
    return NextResponse.json(sanitizeOnboarding(await client.completeWhatsappOnboarding(body)), { status: 202 });
  } catch (error) {
    return bffErrorResponse(error);
  }
}
