import { test, expect } from '@playwright/test';

test("has title", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Short Link Management/);
});

test("has greeting", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: /Hello, .*/ })).toBeInViewport();
});
