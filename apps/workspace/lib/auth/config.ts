import "server-only";

export interface OidcSettings {
  issuer: URL;
  clientId: string;
  clientSecret: string | undefined;
  redirectUri: string;
  scope: string;
  audience: string | undefined;
  sessionMaxAgeSeconds: number;
}

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

export function oidcConfigured(): boolean {
  return Boolean(process.env.OIDC_ISSUER_URL && process.env.OIDC_CLIENT_ID && process.env.OIDC_REDIRECT_URI);
}

export function getOidcSettings(): OidcSettings {
  return {
    issuer: new URL(required("OIDC_ISSUER_URL")),
    clientId: required("OIDC_CLIENT_ID"),
    clientSecret: process.env.OIDC_CLIENT_SECRET?.trim() || undefined,
    redirectUri: required("OIDC_REDIRECT_URI"),
    scope: process.env.OIDC_SCOPE?.trim() || "openid profile email offline_access",
    audience: process.env.OIDC_AUDIENCE?.trim() || undefined,
    sessionMaxAgeSeconds: Number(process.env.WORKSPACE_SESSION_MAX_AGE_SECONDS || 28_800),
  };
}

export function getSessionSecret(): string {
  const secret = required("WORKSPACE_SESSION_SECRET");
  if (secret.length < 32) throw new Error("WORKSPACE_SESSION_SECRET must contain at least 32 characters");
  return secret;
}
