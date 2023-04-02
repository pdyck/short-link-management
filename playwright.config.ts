import { defineConfig, devices } from "@playwright/test";

const port = 3000;
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  retries: 2,
  testDir: "./tests",
  testMatch: /.*\.e2e\.tsx?/,
  timeout: 30 * 1000,
  reporter: "html",

  webServer: {
    port,
    command: "yarn dev",
    reuseExistingServer: !process.env.CI,
  },

  use: {
    baseURL,
    trace: "retry-with-trace",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
