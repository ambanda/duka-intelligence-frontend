import type { ServerWorkspaceSession } from "@duka/auth";
import { timingSafeEqual } from "node:crypto";

function equal(left: string, right: string): boolean {
  const leftBytes = Buffer.from(left);
  const rightBytes = Buffer.from(right);
  return leftBytes.length === rightBytes.length && timingSafeEqual(leftBytes, rightBytes);
}

export function validateMutationRequest(
  request: { headers: Headers; nextUrl: { origin: string } },
  session: ServerWorkspaceSession,
  submittedToken?: string | null,
): string | null {
  const token = submittedToken || request.headers.get("x-duka-csrf");
  if (!token || !equal(token, session.csrfToken)) return "csrf_token_invalid";

  const origin = request.headers.get("origin");
  const expectedOrigin = process.env.WORKSPACE_APP_URL || request.nextUrl.origin;
  if (!origin || origin !== expectedOrigin) return "request_origin_invalid";

  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") return "cross_site_request_rejected";
  return null;
}
