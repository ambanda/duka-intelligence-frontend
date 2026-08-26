import { NextRequest, NextResponse } from "next/server";

import { oidcConfigured } from "@/lib/auth/config";
import { writeTransactionCookie } from "@/lib/auth/cookies";
import { buildOidcAuthorization } from "@/lib/auth/oidc";
import { safeReturnTo } from "@/lib/auth/return-to";
import { encodeOidcTransaction } from "@/lib/auth/session-codec";

export async function GET(request: NextRequest) {
  if (!oidcConfigured()) {
    return NextResponse.redirect(new URL("/auth/error?code=oidc_not_configured", request.url));
  }

  try {
    const returnTo = safeReturnTo(request.nextUrl.searchParams.get("returnTo"));
    const { transaction, url } = await buildOidcAuthorization(returnTo);
    await writeTransactionCookie(await encodeOidcTransaction(transaction));
    return NextResponse.redirect(url);
  } catch {
    return NextResponse.redirect(new URL("/auth/error?code=oidc_start_failed", request.url));
  }
}
