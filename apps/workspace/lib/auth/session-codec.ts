import "server-only";

import type { ServerWorkspaceSession } from "@duka/auth";
import { createHash } from "node:crypto";
import { EncryptJWT, jwtDecrypt, type JWTPayload } from "jose";

import { getSessionSecret } from "./config";

const SESSION_ISSUER = "duka-workspace";
const SESSION_AUDIENCE = "duka-workspace-session";
const TRANSACTION_AUDIENCE = "duka-workspace-oidc-transaction";

export interface OidcTransaction {
  codeVerifier: string;
  state: string;
  nonce: string;
  returnTo: string;
}

function encryptionKey(): Uint8Array {
  return new Uint8Array(createHash("sha256").update(getSessionSecret(), "utf8").digest());
}

async function encrypt(payload: JWTPayload, audience: string, expiresAt: Date): Promise<string> {
  return new EncryptJWT(payload)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuer(SESSION_ISSUER)
    .setAudience(audience)
    .setIssuedAt()
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000))
    .encrypt(encryptionKey());
}

async function decrypt<T>(token: string, audience: string): Promise<T | null> {
  try {
    const { payload } = await jwtDecrypt(token, encryptionKey(), {
      issuer: SESSION_ISSUER,
      audience,
      clockTolerance: 5,
    });
    return payload.data as T;
  } catch {
    return null;
  }
}

export function encodeSession(session: ServerWorkspaceSession): Promise<string> {
  return encrypt({ data: session }, SESSION_AUDIENCE, new Date(session.expiresAt));
}

export function decodeSession(token: string): Promise<ServerWorkspaceSession | null> {
  return decrypt<ServerWorkspaceSession>(token, SESSION_AUDIENCE);
}

export function encodeOidcTransaction(transaction: OidcTransaction): Promise<string> {
  return encrypt({ data: transaction }, TRANSACTION_AUDIENCE, new Date(Date.now() + 10 * 60 * 1000));
}

export function decodeOidcTransaction(token: string): Promise<OidcTransaction | null> {
  return decrypt<OidcTransaction>(token, TRANSACTION_AUDIENCE);
}
