import "server-only";

import type { ServerWorkspaceSession } from "@duka/auth";
import { cookies } from "next/headers";

import { decodeSession, encodeSession } from "./session-codec";

export const OIDC_TRANSACTION_COOKIE = process.env.NODE_ENV === "production"
  ? "__Host-duka-oidc-transaction"
  : "duka-oidc-transaction";
export const SESSION_COOKIE = process.env.NODE_ENV === "production"
  ? "__Host-duka-workspace-session"
  : "duka-workspace-session";

const secure = process.env.NODE_ENV === "production";
const MAX_SESSION_COOKIE_BYTES = 3_800;

export async function readSessionCookie(): Promise<ServerWorkspaceSession | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return token ? decodeSession(token) : null;
}

export async function writeSessionCookie(session: ServerWorkspaceSession): Promise<void> {
  const store = await cookies();
  const token = await encodeSession(session);
  const cookieBytes = Buffer.byteLength(`${SESSION_COOKIE}=${token}`, "utf8");
  if (cookieBytes > MAX_SESSION_COOKIE_BYTES) {
    throw new Error(`Encrypted workspace session exceeds the cookie budget (${cookieBytes} bytes)`);
  }
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    expires: new Date(session.expiresAt),
    priority: "high",
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, "", { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 0 });
}

export async function writeTransactionCookie(value: string): Promise<void> {
  const store = await cookies();
  store.set(OIDC_TRANSACTION_COOKIE, value, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    // Production uses a __Host- cookie, which browsers only accept with Path=/.
    path: "/",
    maxAge: 10 * 60,
    priority: "high",
  });
}

export async function takeTransactionCookie(): Promise<string | null> {
  const store = await cookies();
  const value = store.get(OIDC_TRANSACTION_COOKIE)?.value ?? null;
  store.set(OIDC_TRANSACTION_COOKIE, "", {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return value;
}
