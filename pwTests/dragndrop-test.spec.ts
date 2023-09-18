import { test } from "@playwright/test";

test("drag and drop", async ({ page }) => {
  await page.goto("http://127.0.0.1:3000");

  await page.waitForSelector("data-test-id=drag");

  await page.getByText("Краторная булка N-200i").hover();
  await page.mouse.down();
  await page.locator("data-test-id=drop").hover({ noWaitAfter: true });
  await page.mouse.up();

  await page.getByText("Соус Spicy-X").hover();
  await page.mouse.down();
  await page.locator("data-test-id=drop").hover({ noWaitAfter: true });
  await page.mouse.up();

  await page.getByText("Соус фирменный Space Sauce").hover();
  await page.mouse.down();
  await page.locator("data-test-id=drop").hover({ noWaitAfter: true });
  await page.mouse.up();

  await page.getByText("Говяжий метеорит (отбивная)").hover();
  await page.mouse.down();
  await page.locator("data-test-id=drop").hover({ noWaitAfter: true });
  await page.mouse.up();
});
