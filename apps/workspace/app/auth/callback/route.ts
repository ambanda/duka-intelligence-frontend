import { NextRequest, NextResponse } from "next/server";

import { takeTransactionCookie, writeSessionCookie } from "@/lib/auth/cookies";
import { exchangeOidcCode } from "@/lib/auth/oidc";
import { safeReturnTo } from "@/lib/auth/return-to";
import { decodeOidcTransaction } from "@/lib/auth/session-codec";

export async function GET(request: NextRequest) {
  const appBaseUrl = process.env.WORKSPACE_APP_URL ?? request.url;
  const transactionToken = await takeTransactionCookie();
  const transaction = transactionToken ? await decodeOidcTransaction(transactionToken) : null;
  if (!transaction) {
    return NextResponse.redirect(new URL("/auth/error?code=invalid_login_transaction", appBaseUrl));
  }

  try {
    const session = await exchangeOidcCode(new URL(request.url), transaction);
    await writeSessionCookie(session);
    const firstWorkspace = session.memberships[0];
    const fallback = firstWorkspace ? `/w/${firstWorkspace.workspaceSlug}/overview` : "/onboarding";
    const destination = safeReturnTo(transaction.returnTo, fallback);
    return NextResponse.redirect(new URL(destination === "/" ? fallback : destination, appBaseUrl));
  } catch {
    return NextResponse.redirect(new URL("/auth/error?code=oidc_callback_failed", appBaseUrl));
  }
}
