import "server-only";

import { DukaApiClient, type WorkspaceSummary } from "@duka/api-client";
import type { ServerWorkspaceSession, WorkspaceMembership } from "@duka/auth";
import * as oidc from "openid-client";

import { getOidcSettings } from "./config";
import type { OidcTransaction } from "./session-codec";

let configurationPromise: Promise<oidc.Configuration> | null = null;

async function configuration(): Promise<oidc.Configuration> {
  if (!configurationPromise) {
    const settings = getOidcSettings();
    configurationPromise = oidc.discovery(
      settings.issuer,
      settings.clientId,
      settings.clientSecret,
      undefined,
      { timeout: 10 },
    );
  }
  return configurationPromise;
}

function workspaceDisplayName(workspaceId: string): string {
  return workspaceId
    .replace(/^ws[_-]/i, "")
    .split(/[_-]+/)
    .filter(Boolean)
    .map((value) => value.charAt(0).toUpperCase() + value.slice(1))
    .join(" ") || workspaceId;
}

export function toMembership(workspace: WorkspaceSummary): WorkspaceMembership {
  return {
    tenantId: workspace.tenant_id,
    clientId: workspace.client_id,
    workspaceId: workspace.workspace_id,
    workspaceSlug: workspace.workspace_id,
    organizationId: workspace.organization_id,
    displayName: workspaceDisplayName(workspace.workspace_id),
    sectors: workspace.sectors,
    shopIds: workspace.shop_ids,
    roles: workspace.roles,
    permissionSets: workspace.permission_sets,
  };
}

export async function buildOidcAuthorization(returnTo: string): Promise<{ url: URL; transaction: OidcTransaction }> {
  const settings = getOidcSettings();
  const config = await configuration();
  const codeVerifier = oidc.randomPKCECodeVerifier();
  const codeChallenge = await oidc.calculatePKCECodeChallenge(codeVerifier);
  const state = oidc.randomState();
  const nonce = oidc.randomNonce();
  const parameters: Record<string, string> = {
    redirect_uri: settings.redirectUri,
    response_type: "code",
    scope: settings.scope,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    state,
    nonce,
  };
  if (settings.audience) parameters.audience = settings.audience;
  return {
    url: oidc.buildAuthorizationUrl(config, parameters),
    transaction: { codeVerifier, state, nonce, returnTo },
  };
}

export async function exchangeOidcCode(currentUrl: URL, transaction: OidcTransaction): Promise<ServerWorkspaceSession> {
  const settings = getOidcSettings();
  const config = await configuration();
  const tokens = await oidc.authorizationCodeGrant(config, currentUrl, {
    pkceCodeVerifier: transaction.codeVerifier,
    expectedState: transaction.state,
    expectedNonce: transaction.nonce,
    idTokenExpected: true,
  });
  if (!tokens.access_token) throw new Error("OIDC provider did not return an access token");

  const claims = tokens.claims();
  if (!claims?.sub) throw new Error("OIDC provider did not return a verified subject claim");

  const duka = new DukaApiClient({
    baseUrl: process.env.DUKA_API_BASE_URL ?? "http://localhost:8000",
    getAccessToken: async () => tokens.access_token,
    timeoutMs: 8_000,
  });
  const [me, workspaces] = await Promise.all([duka.getMe(), duka.listWorkspaces()]);
  const now = Date.now();
  const accessTokenLifetime = Math.max(tokens.expiresIn() ?? 300, 60);

  return {
    authMode: "oidc",
    accessToken: tokens.access_token,
    accessTokenExpiresAt: new Date(now + accessTokenLifetime * 1000).toISOString(),
    refreshToken: tokens.refresh_token ?? null,
    idToken: tokens.id_token ?? null,
    csrfToken: oidc.randomState(),
    expiresAt: new Date(now + settings.sessionMaxAgeSeconds * 1000).toISOString(),
    principal: {
      principalId: me.principal_id,
      subject: String(claims.sub),
      email: me.email ?? (typeof claims.email === "string" ? claims.email : null),
      displayName: me.display_name ?? (typeof claims.name === "string" ? claims.name : null),
    },
    memberships: workspaces.workspaces.map(toMembership),
  };
}

export async function refreshOidcSession(session: ServerWorkspaceSession): Promise<ServerWorkspaceSession> {
  if (!session.refreshToken) throw new Error("OIDC refresh token is unavailable");
  const tokens = await oidc.refreshTokenGrant(await configuration(), session.refreshToken);
  if (!tokens.access_token) throw new Error("OIDC refresh did not return an access token");
  return {
    ...session,
    accessToken: tokens.access_token,
    accessTokenExpiresAt: new Date(Date.now() + Math.max(tokens.expiresIn() ?? 300, 60) * 1000).toISOString(),
    refreshToken: tokens.refresh_token ?? session.refreshToken,
    idToken: tokens.id_token ?? session.idToken,
  };
}
