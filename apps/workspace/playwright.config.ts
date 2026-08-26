import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  timeout: 90_000,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3001",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3001/api/health",
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      WORKSPACE_AUTH_MODE: "development",
      WORKSPACE_APP_URL: "http://localhost:3001",
      DUKA_DEV_PRINCIPAL_ID: "principal-e2e",
      DUKA_DEV_WORKSPACE_ID: "workspace-e2e",
      DUKA_DEV_WORKSPACE_SLUG: "workspace-e2e",
      DUKA_DEV_WORKSPACE_NAME: "E2E Workspace",
      DUKA_DEV_TENANT_ID: "tenant-e2e",
      DUKA_DEV_CLIENT_ID: "client-e2e",
      DUKA_DEV_ORGANIZATION_ID: "org-e2e",
      DUKA_DEV_SECTOR: "sacco",
      DUKA_DEV_SHOP_ID: "hq",
      DUKA_DEV_ROLE: "workspace_admin",
      DUKA_DEV_PERMISSION_SET: "workspace_manage",
    },
  },
});
