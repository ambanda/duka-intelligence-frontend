import { DukaApiError } from "@duka/api-client";

export function callbackErrorCode(error: unknown): string {
  if (error instanceof DukaApiError) {
    if (error.status >= 500 || error.status === 0) return "workspace_api_unavailable";
    if (error.status === 401 || error.status === 403) return "workspace_access_denied";
  }
  return "oidc_callback_failed";
}
