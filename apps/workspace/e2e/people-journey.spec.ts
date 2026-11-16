import { expect, test } from "@playwright/test";

test("Users selects people; Channels reviews filtered audiences; journeys retain conversion evidence", async ({ page }, testInfo) => {
  let confirms = 0;
  const person = { contact_id: "person-a", display_name: "Amina Otieno", preferred_name: "Amina", relationships: ["customer"], categories: ["demo_leads"], entry_sources: ["qr_code"], status: "active", version: 1, membership_version: 1,
    identities: [{ identity_id: "identity-a", channel_id: "channel-a", channel_type: "whatsapp", provider_identity: "+254700000001", verification_status: "unverified" }],
    journeys: [{ journey_id: "journey-a", origin_type: "qr_code", status: "completed", conversion_type: "appointment", conversion_reference: "APT-100", started_at: "2026-11-11" }],
    relationship_history: [{ previous_relationships: ["prospect"], relationships: ["customer"], event_type: "appointment.confirmed", subject_reference: "APT-100", rule_version: 1 }],
    outreach: [], consent_events: [], journey_events: [], access: [] };
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
      expect(req.headers()["x-duka-csrf"]).toBeTruthy(); expect(req.postDataJSON()).toMatchObject({ categories: ["demo_leads"], relationships: ["customer"], category_match: "all", contact_ids: [], channel_id: "channel-a", template_record_id: "template-a", field_mappings: { "body.name": "contact.preferred_name" } });
      expect(confirms).toBe(0); return route.fulfill({ json: dispatch });
    }
    return route.fulfill({ json: dispatch });
  });
  await page.route("**/channels/channel-a/message-templates", (route) => route.fulfill({ json: { templates: [{ template_record_id: "template-a", name: "welcome", language: "en", status: "APPROVED", category: "MARKETING", components: [{ type: "BODY", text: "Hello {{name}}, explore our clinic services." }], send_schema: { fields: [{ key: "body.name", label: "Patient name", value_type: "text", required: true }] } }] } }));
  await page.route("**/channels/channel-a/messages", (route) => route.fulfill({ json: { messages: [] } }));
  await page.route("**/channels/channel-a/contacts", (route) => route.fulfill({ json: { contacts: [] } }));
  await page.goto("/w/workspace-e2e/users");
  await page.getByRole("checkbox", { name: "Select Amina Otieno" }).check();
  await page.getByRole("button", { name: "Send template (1)", exact: true }).click();
  await expect(page).toHaveURL(/channels\/channel-a\?panel=messages/);
  await expect(page.getByText("1 selected", { exact: true })).toBeVisible();
  await page.getByRole("combobox", { name: "Audience", exact: true }).selectOption("filters");
  await page.getByRole("checkbox", { name: "Customer", exact: true }).check();
  await page.getByRole("checkbox", { name: "demo leads", exact: true }).check();
  await page.getByRole("combobox", { name: "Tag matching", exact: true }).selectOption("all");
  await page.getByRole("combobox", { name: "Template", exact: true }).selectOption("template-a");
  await page.getByRole("combobox", { name: "Personalization", exact: true }).selectOption("contact.preferred_name");
  await page.getByLabel("Business / campaign reference").fill("demo-launch");
  await page.getByRole("button", { name: "Review audience" }).click();
  await expect(page.getByRole("cell", { name: "marketing_consent_missing" })).toBeVisible();
  expect(confirms).toBe(0);
  await page.screenshot({ path: testInfo.outputPath("channel-audience-review.png"), fullPage: true });
  await page.getByRole("button", { name: "Confirm eligible recipients" }).click();
  expect(confirms).toBe(1);
  await expect(page.getByRole("button", { name: "Confirm eligible recipients" })).toBeDisabled();
  await page.getByRole("link", { name: "Amina Otieno", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Relationship history", exact: true })).toBeVisible();
  await expect(page.getByRole("cell", { name: "appointment.confirmed", exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("people-customer-journey.png"), fullPage: true });
});

test("Users contact dialog collects phone atomically, renders errors and closes on success", async ({ page }, testInfo) => {
  let attempts = 0;
  const contacts: Record<string, unknown>[] = [];
  await page.route("**/api/bff/workspaces/workspace-e2e/operations/**", async (route) => {
    const req = route.request(); const path = new URL(req.url()).pathname;
    if (path.endsWith("/channels")) return route.fulfill({ json: { channels: [{ channel_id: "channel-a", display_name: "Reception", transport_type: "meta_cloud_api", status: "active" }] } });
    if (req.method() === "POST" && path.endsWith("/people")) {
      attempts += 1;
      if (attempts === 1) return route.fulfill({ status: 422, json: { error: { message: "identity.phone_number_e164: Invalid phone number" } } });
      const body = req.postDataJSON();
      expect(body).toMatchObject({ display_name: "Brian Otieno", relationships: ["prospect"], categories: ["consulting_interested"], identity: { channel_id: "channel-a", phone_number_e164: "+254700000002", marketing_consent: null } });
      const person = { ...body, contact_id: "person-b", status: "active", version: 1, membership_version: 1, identities: [] };
      contacts.push(person); return route.fulfill({ json: person });
    }
    return route.fulfill({ json: { contacts, categories: [], next_cursor: null } });
  });
  await page.goto("/w/workspace-e2e/users");
  await expect(page.getByRole("combobox", { name: "Channel", exact: true })).toHaveValue("channel-a");
  await page.getByRole("button", { name: "Add contact", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByLabel("Name", { exact: true }).fill("Brian Otieno");
  await dialog.getByLabel("Phone number", { exact: true }).fill("+254700000002");
  await dialog.getByLabel("New tags", { exact: true }).fill("Consulting interested");
  await dialog.getByRole("button", { name: "Save contact" }).click();
  await expect(dialog.getByRole("alert")).toContainText("identity.phone_number_e164");
  await expect(dialog).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("contact-dialog.png"), fullPage: true });
  await dialog.getByRole("button", { name: "Save contact" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Brian Otieno", exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
