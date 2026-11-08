import { describe, expect, it } from "vitest";
import { DukaApiError } from "@duka/api-client";
import { callbackErrorCode } from "@/lib/auth/callback-error";

describe("OIDC callback failure diagnosis", () => {
  it("distinguishes a backend outage from identity verification", () => {
    expect(callbackErrorCode(new DukaApiError("Unavailable", 502, "failure", "request-1"))).toBe("workspace_api_unavailable");
    expect(callbackErrorCode(new DukaApiError("Network", 0, "unreachable", "request-1"))).toBe("workspace_api_unavailable");
    expect(callbackErrorCode(new DukaApiError("Denied", 401, "denied", "request-1"))).toBe("workspace_access_denied");
    expect(callbackErrorCode(new Error("OIDC verification failed"))).toBe("oidc_callback_failed");
  });
});
