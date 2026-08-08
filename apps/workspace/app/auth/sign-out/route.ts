import { NextRequest, NextResponse } from "next/server";

import { clearSessionCookie } from "@/lib/auth/cookies";
import { getServerSession } from "@/lib/auth/session";
import { validateMutationRequest } from "@/lib/auth/csrf";

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.redirect(new URL("/sign-in", request.url), 303);

  const form = await request.formData();
  const token = String(form.get("csrfToken") ?? "");
  const failure = validateMutationRequest(request, session, token);
  if (failure) return NextResponse.json({ error: failure }, { status: 403 });

  await clearSessionCookie();
  return NextResponse.redirect(new URL("/sign-in?signedOut=1", request.url), 303);
}
