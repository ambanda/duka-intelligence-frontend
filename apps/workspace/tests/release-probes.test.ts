import { afterEach, expect, it, vi } from "vitest";
import { GET as workspaceHealth } from "../app/api/health/route";
import { GET as websiteRelease } from "../../website/app/release.json/route";

afterEach(() => vi.unstubAllEnvs());

it("exposes only non-secret build identity in both release probes", async () => {
  const release = "1".repeat(40);
  vi.stubEnv("DUKA_RELEASE_SHA", release);
  const workspace = await workspaceHealth();
  expect(await workspace.json()).toEqual({ status: "ok", service: "duka-workspace", release });
  expect(workspace.headers.get("cache-control")).toBe("no-store");
  expect(await websiteRelease().json()).toEqual({ status: "ok", service: "duka-website", release });
});
