import { expect, test } from "@playwright/test";

test("knowledge drafts publish with scope, CSRF, and responsive layouts", async ({ page }, testInfo) => {
  const inventory = {
    workspace_id: "workspace-e2e", objects: [] as Record<string, unknown>[], drafts: [] as Record<string, unknown>[],
    collections: [{ collection_key: "public.faqs", display_name: "Public FAQs", visibility: "public", publication_status: "published" }],
    bindings: [], sources: [], events: [],
  };
  let draftBody: Record<string, unknown> = {};
  let csrf = "";
  await page.route("**/api/bff/workspaces/workspace-e2e/knowledge**", async (route) => {
    const request = route.request();
    const path = new URL(request.url()).pathname;
    if (path.endsWith("/draft")) {
      draftBody = request.postDataJSON();
      csrf = request.headers()["x-duka-csrf"];
      inventory.drafts = [{ ...draftBody, object_json: draftBody.object, knowledge_object_id: path.split("/").at(-2), draft_version: 1 }];
      await route.fulfill({ json: { draft_version: 1 } });
    } else if (path.endsWith("/publish")) {
      expect(request.postDataJSON()).toEqual({ expected_version: 1 });
      inventory.objects = [{ knowledge_object_id: "faq-1", display_name: "Opening hours", knowledge_object_type: "common.public_faq", revision_number: 1, publication_status: "published" }];
      inventory.drafts = [];
      await route.fulfill({ json: { revision_number: 1 } });
    } else {
      await route.fulfill({ json: inventory });
    }
  });
  await page.goto("/w/workspace-e2e/knowledge");
  await page.getByRole("button", { name: "New content" }).click();
  await page.getByLabel("Content type").selectOption("common.public_faq");
  await page.getByRole("combobox", { name: "Collection", exact: true }).selectOption("public.faqs");
  await page.getByLabel("Title", { exact: true }).fill("Opening hours");
  await page.getByLabel("Question", { exact: true }).fill("When are you open?");
  await page.getByLabel("Answer", { exact: true }).fill("Weekdays, 8 AM to 5 PM.");
  await expect(page.getByRole("button", { name: "Publish saved draft" })).toBeDisabled();
  await page.getByRole("button", { name: "Save draft" }).click();
  await expect(page.getByRole("button", { name: "Publish saved draft" })).toBeEnabled();
  expect(csrf).toBe("development-csrf-token");
  expect(draftBody).toMatchObject({ collection_key: "public.faqs", object: { type: "common.public_faq", visibility: "public" } });
  await page.screenshot({ path: testInfo.outputPath("knowledge-editor.png"), fullPage: true });
  await page.getByRole("button", { name: "Publish saved draft" }).click();
  await expect(page.getByRole("cell", { name: "Opening hours" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("knowledge-published.png"), fullPage: true });
});
