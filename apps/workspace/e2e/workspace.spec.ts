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
    const metaWindow = window as typeof window & {
      __metaLoginOptions?: Record<string, unknown>;
      FB?: { init: () => void; login: (callback: (value: unknown) => void, options: Record<string, unknown>) => void };
    };
    metaWindow.FB = {
      init: () => undefined,
      login: (callback, options) => {
        metaWindow.__metaLoginOptions = options;
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
    body: JSON.stringify({ session_id: "session-1", status: "pending", state: "state-12345678901234567890123456789012", expires_at: "2030-01-01T00:00:00Z", meta_app_id: "app-1", meta_configuration_id: "config-v4", embedded_signup_version: "v4", graph_api_version: "v25.0" }),
  }));
  await page.route("**/api/bff/channels/whatsapp/onboarding/complete", async (route) => {
    completionBody = route.request().postDataJSON();
    await route.fulfill({
      status: 202,
      contentType: "application/json",
      body: JSON.stringify({ session_id: "session-1", channel_id: "channel-1", status: "active", workspace_id: "workspace-e2e", embedded_signup_version: "v4", completion_type: "phone_complete", phone_setup_status: "verified", waba_id: "waba-1", phone_number_id: "phone-1", bot_phone_number: "+254700000000", display_name: "E2E SACCO", expires_at: "2030-01-01T00:00:00Z", error_code: null, error_summary: null, required_action: null }),
    });
  });

  await page.goto("/w/workspace-e2e/channels/whatsapp/connect", { waitUntil: "load" });
  await page.getByRole("button", { name: "Continue with Meta" }).click();
  await expect.poll(() => page.evaluate(() => (window as typeof window & { __metaLoginOptions?: Record<string, unknown> }).__metaLoginOptions)).toMatchObject({
    config_id: "config-v4",
    auth_type: "rerequest",
    response_type: "code",
    override_default_response_type: true,
    extras: { setup: {} },
  });
  await expect.poll(() => completionBody).toMatchObject({
    authorization_code: "one-time-code",
    waba_id: "waba-1",
    phone_number_id: "phone-1",
    completion_type: "phone_complete",
    meta_event_name: "FINISH",
  });
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

test("channel administrator submits a template and sends an approved message", async ({ page }) => {
  const approvedTemplate = {
    template_record_id: "template-approved", provider_template_id: "meta-template-1",
    name: "appointment_confirmation_v1", language: "en", category: "UTILITY",
    components: [{ type: "BODY", text: "Appointment {{1}} is confirmed." }],
    layout_type: "STANDARD", parameter_format: "positional", definition: {},
    send_schema: { version: 1, parameter_format: "positional", fields: [{ key: "body.1", component: "body", value_type: "text", label: "Appointment reference", required: true }] },
    validation_errors: [], draft_version: 1, quality_score: "GREEN", quality_updated_at: null,
    status: "APPROVED", source: "duka", rejection_reason: null,
    submitted_at: "2030-01-01T00:00:00Z", last_reconciled_at: "2030-01-01T00:00:00Z",
    created_at: "2030-01-01T00:00:00Z", updated_at: "2030-01-01T00:00:00Z",
  };
  let templateCsrf = false;
  let messageBody: Record<string, unknown> | null = null;

  await page.route("**/api/bff/workspaces/workspace-e2e/channels/channel-1/message-templates", async (route) => {
    await route.fulfill({ contentType: "application/json", body: JSON.stringify({ templates: [approvedTemplate] }) });
  });
  await page.route("**/api/bff/workspaces/workspace-e2e/channels/channel-1/message-templates/drafts", async (route) => {
    templateCsrf = Boolean(route.request().headers()["x-duka-csrf"]);
    const body = route.request().postDataJSON() as Record<string, unknown>;
    await route.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify({ ...approvedTemplate, template_record_id: "template-pending", provider_template_id: null, name: body.name, status: "DRAFT", draft_version: 1, validation_errors: [] }) });
  });
  await page.route("**/api/bff/workspaces/workspace-e2e/channels/channel-1/message-templates/template-pending/validate", async (route) => route.fulfill({ contentType: "application/json", body: JSON.stringify({ valid: true, issues: [], components: [], send_schema: { version: 1, parameter_format: "named", fields: [] } }) }));
  await page.route("**/api/bff/workspaces/workspace-e2e/channels/channel-1/message-templates/template-pending/submit", async (route) => route.fulfill({ contentType: "application/json", body: JSON.stringify({ ...approvedTemplate, template_record_id: "template-pending", provider_template_id: "meta-template-2", name: "review_template_v1", status: "PENDING" }) }));
  await page.route("**/api/bff/workspaces/workspace-e2e/channels/channel-1/message-templates/reconcile", async (route) => route.fulfill({ contentType: "application/json", body: JSON.stringify({ channel_id: "channel-1", reconciled: 2, approved: 1, pending: 1, rejected: 0 }) }));
  await page.route("**/api/bff/workspaces/workspace-e2e/channels/channel-1/contacts", async (route) => route.fulfill({ contentType: "application/json", body: JSON.stringify({ contacts: [{ contact_id: "contact-1", recipient: "+254725375358", display_phone_number: "+254 *** 5358", contact_type: "customer", identity_status: "verified", marketing_consent_status: "opted_in", last_seen_at: "2030-01-01T00:00:00Z" }] }) }));
  await page.route("**/api/bff/workspaces/workspace-e2e/channels/channel-1/messages", async (route) => {
    if (route.request().method() === "POST") {
      messageBody = route.request().postDataJSON();
      await route.fulfill({ status: 202, contentType: "application/json", body: JSON.stringify({ request_id: "request-1", message_record_id: "message-1", provider_message_id: "wamid-1", template_name: approvedTemplate.name, template_category: "UTILITY", processing_status: "completed", delivery_status: "sent", error_code: null, sent_at: "2030-01-01T00:00:00Z", delivered_at: null, read_at: null, created_at: "2030-01-01T00:00:00Z" }) });
      return;
    }
    await route.fulfill({ contentType: "application/json", body: JSON.stringify({ messages: [] }) });
  });
  await page.route("**/api/bff/workspaces/workspace-e2e/channels/channel-1/messages/request-1", async (route) => route.fulfill({ contentType: "application/json", body: JSON.stringify({ request_id: "request-1", message_record_id: "message-1", provider_message_id: "wamid-1", template_name: approvedTemplate.name, template_category: "UTILITY", processing_status: "completed", delivery_status: "delivered", error_code: null, sent_at: "2030-01-01T00:00:00Z", delivered_at: "2030-01-01T00:01:00Z", read_at: null, created_at: "2030-01-01T00:00:00Z" }) }));

  await page.goto("/w/workspace-e2e/channels/channel-1", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("appointment_confirmation_v1")).toBeVisible();
  await page.getByRole("button", { name: "Create template" }).click();
  await page.getByLabel("Template name").fill("review_template_v1");
  await page.getByLabel("Body text").fill("Hello {{customer_name}}");
  await page.getByLabel("Body example for {{customer_name}}").fill("Francis");
  await page.getByRole("button", { name: "Save draft" }).click();
  await page.getByRole("button", { name: "Run preflight" }).click();
  await page.getByRole("button", { name: "Submit to Meta" }).click();
  await expect(page.getByText("review_template_v1")).toBeVisible();
  expect(templateCsrf).toBe(true);

  await page.getByRole("tab", { name: /Messages/ }).click();
  await page.getByLabel("Template").selectOption("template-approved");
  await page.getByLabel("Contact").selectOption("+254725375358");
  await page.getByLabel("Appointment reference").fill("APT-001");
  await page.getByLabel("Business purpose").fill("appointment_confirmation");
  await page.getByLabel("Business reference").fill("APT-001");
  await page.getByRole("button", { name: "Send template" }).click();
  await expect.poll(() => messageBody).toMatchObject({ recipient: "+254725375358", template_record_id: "template-approved", values: { "body.1": "APT-001" } });
  await expect(page.getByText("wamid-1")).toBeVisible();
});
