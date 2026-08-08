import { expect, test } from "@playwright/test";

test("assigned workspace is available and a modified slug is denied", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(/\/w\/workspace-e2e\/overview$/);
  await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();
  await page.goto("/w/not-assigned/overview", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Workspace unavailable" })).toBeVisible();
});

test("channels renders live BFF data and disconnects through a CSRF mutation", async ({ page }) => {
  let disconnected = false;
  await page.route("**/api/bff/workspaces/workspace-e2e/channels", async (route) => route.fulfill({
    contentType: "application/json",
    body: JSON.stringify({ pending_onboarding_sessions: [], channels: [{
      channel_id: "channel-1", channel_type: "whatsapp", transport: "whatsapp_cloud_api", display_number: "+254700000000",
      display_name: "E2E SACCO", status: "active", sector: "sacco", default_shop_id: "hq", waba_identifier: "123...789",
      webhook_health: { status: "healthy", healthy: true, last_received_at: "2030-01-01T00:00:00Z" },
      onboarding_status: null, created_at: "2030-01-01T00:00:00Z", updated_at: "2030-01-01T00:00:00Z",
    }] }),
  }));
  await page.route("**/api/bff/workspaces/workspace-e2e/channels/channel-1", async (route) => {
    disconnected = route.request().method() === "DELETE";
    await route.fulfill({ status: 204, body: "" });
  });
  page.on("dialog", (dialog) => void dialog.accept());

  await page.goto("/w/workspace-e2e/channels", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("E2E SACCO")).toBeVisible();
  await page.getByRole("button", { name: "Disconnect E2E SACCO" }).click();
  await expect.poll(() => disconnected).toBe(true);
});

test("Meta Embedded Signup submits the one-time code immediately through the BFF", async ({ page }) => {
  let completionBody: Record<string, unknown> | null = null;
  await page.addInitScript(() => {
    const metaWindow = window as typeof window & { FB?: { init: () => void; login: (callback: (value: unknown) => void) => void } };
    metaWindow.FB = {
      init: () => undefined,
      login: (callback) => {
        window.dispatchEvent(new MessageEvent("message", {
          origin: "https://www.facebook.com",
          data: JSON.stringify({ type: "WA_EMBEDDED_SIGNUP", event: "FINISH", data: { waba_id: "waba-1", phone_number_id: "phone-1", business_id: "business-1" } }),
        }));
        callback({ authResponse: { code: "one-time-code" } });
      },
    };
  });
  await page.route("**/api/bff/workspaces/workspace-e2e/channels/whatsapp/onboarding-sessions", async (route) => route.fulfill({
    status: 201,
    contentType: "application/json",
    body: JSON.stringify({ session_id: "session-1", status: "pending", state: "state-12345678901234567890123456789012", expires_at: "2030-01-01T00:00:00Z", meta_app_id: "app-1", meta_configuration_id: "config-1", graph_api_version: "v23.0" }),
  }));
  await page.route("**/api/bff/channels/whatsapp/onboarding/complete", async (route) => {
    completionBody = route.request().postDataJSON();
    await route.fulfill({
      status: 202,
      contentType: "application/json",
      body: JSON.stringify({ session_id: "session-1", channel_id: "channel-1", status: "active", bot_phone_number: "+254700000000", display_name: "E2E SACCO", expires_at: "2030-01-01T00:00:00Z", error_code: null, error_summary: null, required_action: null }),
    });
  });

  await page.goto("/w/workspace-e2e/channels/whatsapp/connect", { waitUntil: "load" });
  await page.getByRole("button", { name: "Continue with Meta" }).click();
  await expect.poll(() => completionBody).toMatchObject({ authorization_code: "one-time-code", waba_id: "waba-1", phone_number_id: "phone-1" });
  await expect(page.getByRole("button", { name: "WhatsApp connected" })).toBeVisible();
});

test("workspace administrator can discover and publish a sector skill", async ({ page }) => {
  const summary = {
    skill_id: "sacco.evidence_retrieval", sector: "sacco", skill_name: "Document Evidence Retrieval",
    description: "Retrieve citation-ready evidence from authorized SACCO documents.", interaction_profile: "internal_assistance",
    workflow_id: null, workflow_version: null, risk_level: "read_only", supported_channels: ["whatsapp", "web", "api"],
    binding_status: "not_configured", enabled: false, config_version: null,
  };
  const schema = { type: "object", additionalProperties: false, properties: { retrieval_mode: { type: "string", enum: ["lexical", "vector", "hybrid"] }, result_limit: { type: "integer", minimum: 1, maximum: 20 } } };
  const detail = (status: string, version: number | null, config: Record<string, unknown>) => ({
    workspace_id: "workspace-e2e",
    skill: { ...summary, binding_status: status, enabled: status === "active", config_version: version, allowed_roles: ["admin"], required_permission_set: "read_knowledge", config_schema: schema, published_config: status === "active" ? config : {}, draft_config: config, validation_errors: [], published_at: status === "active" ? "2030-01-01T00:00:00Z" : null, published_by_principal_id: status === "active" ? "principal-e2e" : null },
  });
  let draftBody: Record<string, unknown> | null = null;
  let csrfSeen = false;

  await page.route("**/api/bff/workspaces/workspace-e2e/skills", async (route) => route.fulfill({ contentType: "application/json", body: JSON.stringify({ workspace_id: "workspace-e2e", skills: [summary] }) }));
  await page.route("**/api/bff/workspaces/workspace-e2e/channels", async (route) => route.fulfill({ contentType: "application/json", body: JSON.stringify({ channels: [], pending_onboarding_sessions: [] }) }));
  await page.route("**/api/bff/workspaces/workspace-e2e/skills/sacco.evidence_retrieval", async (route) => route.fulfill({ contentType: "application/json", body: JSON.stringify(detail("not_configured", null, {})) }));
  await page.route("**/api/bff/workspaces/workspace-e2e/skills/sacco.evidence_retrieval/draft", async (route) => {
    draftBody = route.request().postDataJSON();
    csrfSeen = Boolean(route.request().headers()["x-duka-csrf"]);
    await route.fulfill({ contentType: "application/json", body: JSON.stringify(detail("draft", 1, (draftBody?.config as Record<string, unknown>) ?? {})) });
  });
  await page.route("**/api/bff/workspaces/workspace-e2e/skills/sacco.evidence_retrieval/validate", async (route) => route.fulfill({ contentType: "application/json", body: JSON.stringify({ workspace_id: "workspace-e2e", skill_id: summary.skill_id, valid: true, errors: [], config_version: 1 }) }));
  await page.route("**/api/bff/workspaces/workspace-e2e/skills/sacco.evidence_retrieval/publish", async (route) => route.fulfill({ contentType: "application/json", body: JSON.stringify(detail("active", 1, { retrieval_mode: "hybrid", result_limit: 5 })) }));

  await page.goto("/w/workspace-e2e/skills", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("Document Evidence Retrieval")).toBeVisible();
  await page.getByRole("link", { name: "Configure" }).click();
  await page.getByLabel("Retrieval Mode").selectOption("hybrid");
  await page.getByLabel("Result Limit").fill("5");
  await page.getByRole("button", { name: "Save draft" }).click();
  await expect.poll(() => draftBody).toMatchObject({ config: { retrieval_mode: "hybrid", result_limit: 5 } });
  expect(csrfSeen).toBe(true);
  await page.getByRole("button", { name: "Validate" }).click();
  await expect(page.getByText("Configuration is valid and ready to publish.")).toBeVisible();
  await page.getByRole("button", { name: "Publish" }).click();
  await expect(page.getByText("Skill published and available to the workspace runtime.")).toBeVisible();
  await expect(page.getByText("Active")).toBeVisible();
});
