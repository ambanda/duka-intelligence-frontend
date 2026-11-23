import { expect, test } from "@playwright/test";
test("configure both merchant providers and activate a shop with verified collection evidence", async ({ page }, testInfo) => {
  const inventory = {
    can_manage: true,
    shops: [{ shop_id: "main", display_name: "Duka HQ", currency: "KES", timezone: "Africa/Nairobi", status: "active" }],
    connections: [{ payment_connection_id: "mpesa-main", display_name: "Duka M-Pesa", provider: "mpesa", environment: "production", merchant_account_id: "123456", status: "active" }],
    methods: [{ payment_method_id: "method-main", shop_id: "main", payment_connection_id: "mpesa-main", currency: "KES", environment: "production", status: "verification_pending", is_default: true }],
    payments: [{ payment_intent_id: "proof-main", shop_id: "main", amount: "1.00", currency: "KES", status: "succeeded", evidence_status: "callback_verified", allocation_status: "not_required" }],
  };
  const operations: string[] = [];
  await page.route("**/api/bff/workspaces/*/shop-payments**", async route => {
    const request = route.request(); const path = new URL(request.url()).pathname;
    if (request.method() === "GET") return route.fulfill({ json: inventory });
    expect(request.headers()["x-duka-csrf"]).toBeTruthy(); operations.push(path);
    const body = request.postDataJSON();
    if (path.endsWith("/connections/bank-main")) {
      expect(body.provider).toBe("pesalink"); expect(body.provider_config.signature_mode).toBe("hmac_sha256");
      expect(body.credential_secret_ref).toMatch(/\/versions\/1$/); expect(body).not.toHaveProperty("client_secret");
    }
    if (path.endsWith("/activate")) { expect(body.test_payment_intent_id).toBe("proof-main"); inventory.methods[0].status = "active"; }
    if (path.endsWith("/pause")) inventory.methods[0].status = "paused";
    return route.fulfill({ json: { status: "success" } });
  });
  await page.goto("/w/workspace-e2e/payments");
  await expect(page.getByRole("heading", { name: "Shop payments", exact: true })).toBeVisible();
  await expect(page.getByText("production / verification pending", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: "Merchant account", exact: true }).click();
  await page.getByLabel("Provider", { exact: true }).selectOption("pesalink");
  await page.getByLabel("Identifier", { exact: true }).fill("bank-main");
  await page.getByLabel("Display name", { exact: true }).fill("Duka bank collections");
  await page.getByLabel("Merchant account ID").fill("merchant-bank-1");
  await page.getByLabel("Secret version reference").fill("projects/test/secrets/duka-payments-tenant-bank-main/versions/1");
  await page.getByLabel("Provider contract").fill(JSON.stringify({ base_url: "https://bank.test", token_path: "/oauth", lipa_na_bank_initiate_path: "/collect", payment_status_path: "/status", signature_mode: "hmac_sha256" }));
  await page.screenshot({ path: testInfo.outputPath("shop-payment-form.png"), fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByText("Saved.", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Check account", exact: true }).click();
  await expect(page.getByText("Merchant authentication checked.")).toBeVisible();
  await page.getByLabel("Confirmed collection ID").fill("proof-main");
  await page.getByRole("button", { name: "Activate", exact: true }).click();
  await expect(page.getByText("Shop method activated.")).toBeVisible();
  await page.getByRole("button", { name: "Pause", exact: true }).click();
  await expect(page.getByText("Shop method paused.")).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("shop-payment-history.png"), fullPage: true });
  expect(operations.some(path => path.endsWith("/activate"))).toBe(true);
});
