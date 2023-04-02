import { test } from "@playwright/test";

test("everything", async ({ page }) => {
    const time = Date.now();
    const email = `user${time}@test.test`;

    await page.goto("/login");
    await page.click("text=Sign up");
    await page.getByPlaceholder("email").fill(email);
    await page.getByPlaceholder("password").fill("testpassword");
    await page.locator("button", { hasText: "Sign up" }).click();

    await page.waitForURL("/");
    await page.locator("heading", { hasText: `Hello, ${email}` });

    const link = "https://playwright.dev";
    await page.getByPlaceholder("Enter a link").fill(link);
    await page.locator("button", { hasText: "+" }).click();
    await page.locator("heading", { hasText: "playwright.dev link" });
});
