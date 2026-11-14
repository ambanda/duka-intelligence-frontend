import { expect, test } from "@playwright/test";

test("contact or category, channel, template, exclusions and referenceable journey", async ({ page }, testInfo) => {
  let confirms = 0;
  const person = { contact_id: "person-a", display_name: "Amina Otieno", preferred_name: "Amina", relationships: ["prospect"], categories: ["demo_leads"], status: "active", version: 1, membership_version: 1,
    identities: [{ identity_id: "identity-a", channel_id: "channel-a", channel_type: "whatsapp", provider_identity: "+254700000001", verification_status: "unverified" }],
    journeys: [{ journey_id: "journey-a", origin_type: "template_campaign", status: "completed", conversion_type: "appointment", conversion_reference: "APT-100", started_at: "2026-11-11" }],
    outreach: [{ journey_reference: "outreach-a", journey_id: "journey-a", business_reference: "demo-launch", delivery_status: "delivered" }], consent_events: [], journey_events: [], access: [] };
  const dispatch = { dispatch_id: "dispatch-a", status: "draft", payload_hash: "a".repeat(64), recipients: [
    { contact_id: "person-a", display_name: "Amina Otieno", eligibility_reason: "eligible", status: "pending", journey_reference: "outreach-a" },
    { contact_id: "person-b", display_name: "Brian", eligibility_reason: "marketing_consent_missing", status: "excluded", journey_reference: "outreach-b" },
  ] };
  await page.route("**/api/bff/workspaces/workspace-e2e/operations/**", async (route) => {
    const req = route.request(); const path = new URL(req.url()).pathname;
    if (path.endsWith("/channels")) return route.fulfill({ json: { channels: [{ channel_id: "channel-a", display_name: "Clinic reception", bot_phone_number: "+15555550100", transport_type: "meta_cloud_api", status: "active" }] } });
    if (path.endsWith("/people")) return route.fulfill({ json: { contacts: [person], categories: ["demo_leads"], next_cursor: null } });
    if (path.endsWith("/people/person-a")) return route.fulfill({ json: person });
    if (path.endsWith("/confirm")) { confirms += 1; expect(req.headers()["x-duka-csrf"]).toBeTruthy(); dispatch.status = "queued"; return route.fulfill({ json: dispatch }); }
    if (path.endsWith("/dispatches")) {
      expect(req.headers()["x-duka-csrf"]).toBeTruthy(); expect(req.postDataJSON()).toMatchObject({ category: "demo_leads", contact_ids: [], channel_id: "channel-a", template_record_id: "template-a", field_mappings: { "body.name": "contact.preferred_name" } });
      expect(confirms).toBe(0); return route.fulfill({ json: dispatch });
    }
    return route.fulfill({ json: dispatch });
  });
  await page.route("**/channels/channel-a/message-templates", (route) => route.fulfill({ json: { templates: [{ template_record_id: "template-a", name: "welcome", language: "en", status: "APPROVED", category: "MARKETING", components: [{ type: "BODY", text: "Hello {{name}}, explore our clinic services." }], send_schema: { fields: [{ key: "body.name", label: "Patient name", value_type: "text", required: true }] } }] } }));
  await page.goto("/w/workspace-e2e/users");
  await page.getByRole("checkbox", { name: "Select Amina Otieno" }).check();
  await page.getByRole("button", { name: "Compose", exact: true }).click();
  await page.getByRole("combobox", { name: "Audience", exact: true }).selectOption("demo_leads");
  await page.getByRole("combobox", { name: "Sender", exact: true }).selectOption("channel-a");
  await page.getByRole("combobox", { name: "Template", exact: true }).selectOption("template-a");
  await page.getByRole("combobox", { name: "Personalization", exact: true }).selectOption("contact.preferred_name");
  await page.getByLabel("Business / campaign reference").fill("demo-launch");
  await page.getByRole("button", { name: "Review audience" }).click();
  await expect(page.getByRole("cell", { name: "marketing_consent_missing" })).toBeVisible();
  expect(confirms).toBe(0);
  await page.screenshot({ path: testInfo.outputPath("people-audience-review.png"), fullPage: true });
  await page.getByRole("button", { name: "Confirm eligible recipients" }).click();
  expect(confirms).toBe(1);
  await expect(page.getByRole("button", { name: "Confirm eligible recipients" })).toBeDisabled();
  await page.getByRole("button", { name: "Close", exact: true }).click();
  await page.getByRole("button", { name: "Amina Otieno", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Customer journey", exact: true })).toBeVisible();
  await expect(page.getByRole("cell", { name: "APT-100", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "person-a", exact: true })).toHaveAttribute("href", "?contact=person-a");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("people-customer-journey.png"), fullPage: true });
});
