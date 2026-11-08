import { expect, test } from "@playwright/test";

test("add contact, record evidenced permission, and send only after eligibility", async ({ page }, testInfo) => {
  const base = "**/api/bff/workspaces/workspace-e2e/channels/channel-1";
  let saved: Record<string, unknown> | null = null;
  let contacts: Record<string, unknown>[] = [];
  let sends = 0;
  let consented = false;
  const template = {
    template_record_id: "marketing-1", name: "welcome_offer", language: "en", category: "MARKETING",
    components: [{ type: "BODY", text: "Welcome to our business." }], status: "APPROVED", source: "meta",
    quality_score: "GREEN", send_schema: { fields: [] }, validation_errors: [],
  };
  await page.route(`${base}/message-templates`, (route) => route.fulfill({ json: { templates: [template] } }));
  await page.route(`${base}/contact-tags`, (route) => route.fulfill({ json: { tags: [] } }));
  await page.route(`${base}/marketing-segments`, (route) => route.fulfill({ json: { segments: [] } }));
  await page.route(`${base}/contacts`, async (route) => {
    if (route.request().method() === "GET") return route.fulfill({ json: { contacts } });
    expect(route.request().headers()["x-duka-csrf"]).toBeTruthy();
    saved = route.request().postDataJSON() as Record<string, unknown>;
    consented = Boolean(saved.marketing_consent);
    const contact = {
      contact_id: "contact-1", recipient: "+254700000001", display_phone_number: "+254700000001",
      display_name: "Amina Otieno", preferred_name: "Amina", tags: [], contact_type: "prospect",
      identity_status: "unidentified", marketing_consent_status: consented ? "opted_in" : "unknown",
      consent_purposes: consented ? ["catalog_updates"] : [], last_seen_at: "2026-01-01T00:00:00Z",
    };
    const created = contacts.length === 0;
    contacts = [contact];
    return route.fulfill({ json: { contact, created, consent_outcome: consented ? "imported" : "not_recorded" } });
  });
  await page.route(`${base}/message-eligibility`, (route) => route.fulfill({ json: {
    eligible: consented, reason: consented ? "eligible" : "marketing_consent_missing",
  } }));
  await page.route(`${base}/messages`, (route) => {
    if (route.request().method() === "GET") return route.fulfill({ json: { messages: [] } });
    sends += 1;
    expect(consented).toBe(true);
    return route.fulfill({ json: {
      request_id: "send-1", template_name: "welcome_offer", template_category: "MARKETING",
      processing_status: "completed", delivery_status: "delivered", provider_message_id: "wamid.test-only",
    } });
  });
  await page.goto("/w/workspace-e2e/channels/channel-1", { waitUntil: "domcontentloaded" });
  await page.getByRole("tab", { name: /Contacts/ }).click();
  await page.getByRole("button", { name: "Add contact" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByLabel("Record existing marketing permission")).not.toBeChecked();
  await dialog.getByLabel("Phone number").fill("+254700000001");
  await dialog.getByLabel("Display name").fill("Amina Otieno");
  await dialog.getByLabel("Preferred name").fill("Amina");
  await page.screenshot({ path: testInfo.outputPath("add-contact.png"), fullPage: true });
  await dialog.getByRole("button", { name: "Save contact" }).click();
  await expect(dialog).not.toBeVisible();
  expect(saved).not.toHaveProperty("marketing_consent");
  expect(sends).toBe(0);
  await expect(page.getByRole("status")).toContainText("No message was sent");

  await page.getByRole("tab", { name: /Messages/ }).click();
  await page.getByRole("combobox", { name: "Template", exact: true }).selectOption("marketing-1");
  await page.getByRole("combobox", { name: "Contact", exact: true }).selectOption("+254700000001");
  await page.getByLabel("Business purpose").fill("catalog_updates");
  await page.getByLabel("Business reference").fill("DEMO-1");
  await expect(page.getByText("Marketing permission has not been recorded for this contact.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Send template" })).toBeDisabled();

  await page.getByRole("button", { name: "Record permission" }).click();
  await expect(dialog.getByLabel("Phone number")).toHaveValue("+254700000001");
  await expect(dialog.getByLabel("Phone number")).toHaveAttribute("readonly", "");
  await dialog.getByLabel("Record existing marketing permission").check();
  await dialog.getByLabel("Marketing purpose").selectOption("catalog_updates");
  await dialog.getByLabel("Permission source").selectOption("offline_form");
  await dialog.getByLabel("Evidence reference").fill("offline-form:42");
  await dialog.getByLabel("Consent wording / policy version").fill("tenant-marketing-v1");
  await dialog.getByLabel("Permission given at").fill("2026-01-01T10:00");
  await dialog.getByLabel("I confirm this person").check();
  await page.screenshot({ path: testInfo.outputPath("consent-evidence.png"), fullPage: true });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await dialog.getByRole("button", { name: "Save contact" }).click();
  await expect(dialog).not.toBeVisible();
  expect(saved).toMatchObject({ marketing_consent: {
    confirmed: true, purposes: ["catalog_updates"], evidence_reference: "offline-form:42",
    policy_version: "tenant-marketing-v1", source: "offline_form",
  } });
  expect(sends).toBe(0);
  await expect(page.getByRole("button", { name: "Send template" })).toBeEnabled();
  await page.getByRole("button", { name: "Send template" }).click();
  await expect.poll(() => sends).toBe(1);
  await expect(page.getByText("wamid.test-only")).toBeVisible();
});
