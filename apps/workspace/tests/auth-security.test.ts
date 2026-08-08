import type { ServerWorkspaceSession } from "@duka/auth";
import { describe, expect, it } from "vitest";

import { validateMutationRequest } from "@/lib/auth/csrf";
import { safeReturnTo } from "@/lib/auth/return-to";

const session = { csrfToken: "known-token" } as ServerWorkspaceSession;
function request(origin: string | null, token = "known-token", fetchSite = "same-origin") {
  return {
    headers: new Headers({ ...(origin ? { origin } : {}), "x-duka-csrf": token, "sec-fetch-site": fetchSite }),
    nextUrl: new URL("https://app.dukaintelligence.co.ke/api/bff/test"),
  };
}

describe("authentication request security", () => {
  it("allows a same-origin request with the session CSRF token", () => {
    expect(validateMutationRequest(request("https://app.dukaintelligence.co.ke"), session)).toBeNull();
  });

  it("rejects missing, incorrect, and cross-site mutation evidence", () => {
    expect(validateMutationRequest(request(null), session)).toBe("request_origin_invalid");
    expect(validateMutationRequest(request("https://app.dukaintelligence.co.ke", "wrong"), session)).toBe("csrf_token_invalid");
    expect(validateMutationRequest(request("https://evil.example", "known-token", "cross-site"), session)).toBe("request_origin_invalid");
  });

  it("allows only local relative return locations", () => {
    expect(safeReturnTo("/w/workspace-a/overview")).toBe("/w/workspace-a/overview");
    expect(safeReturnTo("//evil.example")).toBe("/");
    expect(safeReturnTo("https://evil.example")).toBe("/");
  });
});
