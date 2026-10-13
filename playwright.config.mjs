import { defineConfig } from '@playwright/test';

// Smoke tests run against the built site (dist/).
export default defineConfig({
  testDir: 'tests',
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: 'http://localhost:5180', acceptDownloads: true },
  webServer: {
    command: 'node tools/build.mjs && python3 -m http.server 5180 --bind 127.0.0.1 --directory dist',
    env: { SITE_URL: 'https://daycell.test' },
    url: 'http://localhost:5180/',
    reuseExistingServer: false,
    stdout: 'ignore',
    stderr: 'ignore',
  },
});
