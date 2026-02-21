import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility (axe)", () => {
  test("home has no critical a11y violations", async ({ page }) => {
    await page.goto("/en");
    await expect(
      page.getByRole("link", { name: /Get in Touch|Связаться|Bog'lanish/i }).or(
        page.getByRole("link", { name: /Info|Инфо/i })
      )
    ).toBeVisible({ timeout: 25_000 });
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(results.violations).toEqual([]);
  });

  test("contact page has no critical a11y violations", async ({ page }) => {
    await page.goto("/en/contact");
    await expect(page.getByRole("heading", { name: /Contact|Контакты|Let's Connect/i })).toBeVisible({ timeout: 15_000 });
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(results.violations).toEqual([]);
  });
});
