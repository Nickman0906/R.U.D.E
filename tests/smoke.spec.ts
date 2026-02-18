import { test, expect } from "@playwright/test";

test("dashboard renders", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page.getByTestId("dashboard-page")).toBeVisible();
  await expect(page.getByRole("heading", { name: "JARVIS" })).toBeVisible();
});
