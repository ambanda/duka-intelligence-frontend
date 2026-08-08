import { DukaApiClient } from "@duka/api-client";

import { getServerSession } from "@/lib/auth/session";

export function createControlPlaneClient(): DukaApiClient {
  return new DukaApiClient({
    baseUrl: process.env.DUKA_API_BASE_URL ?? "http://localhost:8000",
    getAccessToken: async () => {
      const session = await getServerSession();
      return session?.authMode === "oidc" ? session.accessToken : null;
    },
    timeoutMs: 8_000,
  });
}
