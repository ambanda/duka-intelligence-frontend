import "server-only";

import { DukaApiClient, DukaApiError } from "@duka/api-client";
import { assertWorkspaceMembership, type ServerWorkspaceSession, type WorkspaceMembership } from "@duka/auth";
import { NextRequest, NextResponse } from "next/server";

import { clearSessionCookie, writeSessionCookie } from "@/lib/auth/cookies";
import { validateMutationRequest } from "@/lib/auth/csrf";
import { refreshOidcSession } from "@/lib/auth/oidc";
import { getServerSession } from "@/lib/auth/session";

export class BffError extends Error {
  constructor(readonly status: number, readonly code: string, message: string) {
    super(message);
    this.name = "BffError";
  }
}

export interface BffContext {
  client: DukaApiClient;
  requestId: string;
  session: ServerWorkspaceSession;
}

function correlationId(request: NextRequest): string {
  const supplied = request.headers.get("x-request-id");
  return supplied && /^[a-zA-Z0-9_-]{8,128}$/.test(supplied) ? supplied : crypto.randomUUID();
}

export async function requireBffContext(request: NextRequest): Promise<BffContext> {
  let session = await getServerSession();
  if (!session) throw new BffError(401, "session_required", "Authentication is required.");

  if (session.authMode === "oidc" && Date.parse(session.accessTokenExpiresAt) <= Date.now() + 60_000) {
    try {
      session = await refreshOidcSession(session);
      await writeSessionCookie(session);
    } catch {
      await clearSessionCookie();
      throw new BffError(401, "session_expired", "Your session has expired.");
    }
  }

  const requestId = correlationId(request);
  return {
    requestId,
    session,
    client: new DukaApiClient({
      baseUrl: process.env.DUKA_API_BASE_URL ?? "http://localhost:8000",
      getAccessToken: async () => session?.accessToken || null,
      developmentPrincipalId: session.authMode === "development" ? session.principal.principalId : undefined,
      requestIdFactory: () => requestId,
      timeoutMs: 8_000,
    }),
  };
}

export function requireBffWorkspace(session: ServerWorkspaceSession, workspaceSlug: string): WorkspaceMembership {
  try {
    return assertWorkspaceMembership(session, workspaceSlug);
  } catch {
    throw new BffError(404, "workspace_not_found", "Workspace was not found.");
  }
}

export function requireBffMutation(request: NextRequest, session: ServerWorkspaceSession): void {
  const failure = validateMutationRequest(request, session);
  if (failure) throw new BffError(403, failure, "The mutation request could not be verified.");
}

export async function readBffJson<T>(request: NextRequest): Promise<T> {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 64 * 1024) throw new BffError(413, "request_too_large", "Request body is too large.");
  try {
    return (await request.json()) as T;
  } catch {
    throw new BffError(400, "invalid_json", "Request body must be valid JSON.");
  }
}

export function bffErrorResponse(error: unknown): NextResponse {
  if (error instanceof BffError) {
    return NextResponse.json({ error: { code: error.code, message: error.message } }, { status: error.status });
  }
  if (error instanceof DukaApiError) {
    const passThrough = new Set([400, 401, 403, 404, 409, 413, 422, 429]);
    const status = passThrough.has(error.status) ? error.status : 502;
    return NextResponse.json(
      {
        error: {
          code: error.code,
          message: status === 502 ? "Duka control plane is temporarily unavailable." : error.message,
          detail: status === 502 ? null : error.detail,
        },
        request_id: error.requestId,
      },
      { status },
    );
  }
  return NextResponse.json({ error: { code: "bff_internal_error", message: "The request could not be completed." } }, { status: 500 });
}
