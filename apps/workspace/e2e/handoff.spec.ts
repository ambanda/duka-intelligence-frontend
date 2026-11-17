import { expect, test } from "@playwright/test";

test("claim, reply, reassign and return a continuous customer conversation to the bot", async ({ page }, testInfo) => {
  const id = "HND-ABCDEF012345";
  const view = {
    handoff_case_id: id, status: "notified", priority: "normal", ownership_version: 1,
    customer_name: "Amina Otieno", assigned_principal_id: "principal-e2e", current_principal_id: "principal-e2e",
    claimed_at: null as string | null, closed_at: null as string | null, unread_count: 2, bot_paused: true, can_manage: true,
    summary: "Customer request: I need help collecting my order. Recent customer context: Order RT-301 is ready, but I need a later collection time.",
    trigger_message: "I need help collecting my order", customer_window_open: true, journey_id: "journey-qr-reception",
    updated_at: "2026-11-17T10:00:00Z", candidates: [{ principal_id: "principal-e2e", display_name: "Francis" }, { principal_id: "staff-2", display_name: "Reception" }],
    messages: [
      { message_record_id: "m1", author: "customer", text: "Can I collect order RT-301 tomorrow?", message_type: "text", created_at: "2026-11-17T09:58:00Z", delivery_status: null, attachments: [] },
      { message_record_id: "m2", author: "assistant", text: "I will ask the team to confirm collection.", message_type: "text", created_at: "2026-11-17T09:59:00Z", delivery_status: "delivered", attachments: [] },
    ], next_before: null, deliveries: [] as Record<string, unknown>[],
  };
  const actions: string[] = [];
  await page.route("**/handoffs**", route => route.fulfill({ json: { cases: [view] } }));
  await page.route("**/handoffs/**", async route => {
    const request = route.request();
    if (request.method() === "POST") {
      expect(request.headers()["x-duka-csrf"]).toBeTruthy();
      const body = request.postDataJSON(); actions.push(body.action);
      expect(body.ownership_version).toBe(view.ownership_version);
      if (body.action === "claim") { view.claimed_at = "2026-11-17T10:01:00Z"; view.status = "assigned"; view.ownership_version++; }
      if (body.action === "reply") {
        view.deliveries = [{ outbox_id: "queued-1", direction: "customer", status: "queued", text: body.text, error_code: null, created_at: "2026-11-17T10:02:00Z" }];
        view.status = "awaiting_customer";
      }
      if (body.action === "reassign") { view.assigned_principal_id = body.target; view.ownership_version++; }
      if (body.action === "return_to_bot") { expect(body.cancel_pending).toBe(true); view.closed_at = "2026-11-17T10:04:00Z"; view.bot_paused = false; view.status = "returned_to_bot"; view.deliveries = []; view.ownership_version++; }
    }
    return route.fulfill({ json: view });
  });
  await page.goto("/w/workspace-e2e/channels/channel-a/conversations");
  await page.getByRole("button", { name: /Amina Otieno/ }).click();
  await expect(page.getByRole("region", { name: "Handoff summary" })).toContainText("Order RT-301");
  await expect(page.getByLabel("Reply as the business")).toBeDisabled();
  await page.getByRole("button", { name: "Claim", exact: true }).click();
  await page.getByLabel("Reply as the business").fill("Tomorrow at 10 is fine. Your order will be held.");
  await page.getByRole("button", { name: "Queue reply", exact: true }).click();
  await expect(page.getByText("Customer reply: queued", { exact: true })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("handoff-conversation.png"), fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByLabel("Reassign", { exact: true }).selectOption("staff-2");
  await page.getByRole("button", { name: "Assign", exact: true }).click();
  await expect(page.getByLabel("Reply as the business")).toBeDisabled();
  await page.getByLabel("Reassign", { exact: true }).selectOption("principal-e2e");
  await page.getByRole("button", { name: "Assign", exact: true }).click();
  await page.getByLabel("Resolution / bot recap").fill("Collection confirmed for tomorrow at 10.");
  await page.getByLabel("Cancel unsent replies when closing").check();
  await page.getByRole("button", { name: "Return to bot", exact: true }).click();
  await expect(page.getByText(/Bot available/)).toBeVisible();
  expect(actions).toEqual(["claim", "reply", "reassign", "reassign", "return_to_bot"]);
});
