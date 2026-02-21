import { test, expect } from "@playwright/test";

// Ждём, пока загрузка и анимации закончатся (экран загрузки ~1.2s + появление контента)
async function waitForPageReady(page: { getByRole: (role: string, opts?: { name: string | RegExp }) => any }) {
  await expect(
    page.getByRole("link", { name: /Get in Touch|Связаться|Bog'lanish/i }).or(
      page.getByRole("link", { name: /Info|Инфо/i })
    )
  ).toBeVisible({ timeout: 25_000 });
}

test.describe("Portfolio smoke", () => {
  test("home loads and shows hero", async ({ page }) => {
    await page.goto("/en");
    // Герой загружен, если в main видна кнопка «Связаться» (она появляется вместе с анимацией героя)
    const heroCta = page.getByRole("main").getByRole("link", { name: /Get in Touch|Связаться|Bog'lanish/i });
    await expect(heroCta).toBeVisible({ timeout: 25_000 });
  });

  test("navigation: Work, Info, Contact", async ({ page }) => {
    await page.goto("/en");
    await waitForPageReady(page);
    const nav = page.getByRole("navigation", { name: /Main navigation/i });
    await nav.getByRole("link", { name: /Info/i }).click();
    await expect(page).toHaveURL(/\/en\/info/);
    await nav.getByRole("link", { name: /Contact|Контакты|Aloqa/i }).click();
    await expect(page).toHaveURL(/\/en\/contact/);
  });

  test("Resume link exists and is downloadable", async ({ page }) => {
    await page.goto("/en");
    await waitForPageReady(page);
    const resume = page.locator('a[href="/resume.pdf"]').first();
    await expect(resume).toBeVisible({ timeout: 10_000 });
    await expect(resume).toHaveAttribute("href", "/resume.pdf");
  });

  test("language switch updates locale", async ({ page }) => {
    await page.goto("/en");
    await waitForPageReady(page);
    await page.getByRole("button", { name: /Switch to (ru|RU)/i }).click();
    await expect(page).toHaveURL(/\/ru/);
  });

  test("lightbox: open Schedy image and back button", async ({ page }) => {
    await page.goto("/en");
    await waitForPageReady(page);
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /Schedy 1/i }).click();
    await expect(page.getByRole("dialog", { name: /Schedy/i })).toBeVisible({ timeout: 15_000 });
    const backBtn = page.getByRole("button", { name: /Back|Назад|Orqaga/i });
    await expect(backBtn).toBeVisible();
    await backBtn.click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("contact CTA from hero", async ({ page }) => {
    await page.goto("/en");
    await waitForPageReady(page);
    await page.getByRole("main").getByRole("link", { name: /Get in Touch|Связаться|Bog'lanish/i }).click();
    await expect(page).toHaveURL(/\/en\/contact/, { timeout: 15_000 });
  });

  const locales = [
    { locale: "ru", heroCta: /Связаться|Get in Touch|Bog'lanish/i, contact: /Контакты|Contact|Aloqa/i },
    { locale: "uz", heroCta: /Bog'lanish|Get in Touch|Связаться/i, contact: /Aloqa|Contact|Контакты/i },
  ] as const;

  for (const { locale, heroCta, contact } of locales) {
    test(`${locale}: home loads and nav to contact`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(
        page.getByRole("main").getByRole("link", { name: heroCta }).or(page.getByRole("navigation").getByRole("link", { name: /Info|Инфо/i }))
      ).toBeVisible({ timeout: 25_000 });
      await page.getByRole("navigation", { name: /Main navigation/i }).getByRole("link", { name: contact }).click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/contact`), { timeout: 15_000 });
    });
  }
});
