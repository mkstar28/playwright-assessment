import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['html'], ['list']],
  snapshotPathTemplate: '{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}{-projectName}{ext}',
  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'ui',
      testMatch: /ui\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
        testIdAttribute: 'data-test',
      },
    },
    {
      name: 'fakestore',
      testMatch: /api\/fakestore\/.*\.spec\.ts/,
      use: {
        baseURL: 'https://fakestoreapi.com',
      },
    },
    {
      name: 'reqres',
      testMatch: /api\/users\.spec\.ts/,
      use: {
        baseURL: 'https://reqres.in',
        extraHTTPHeaders: process.env.REQRES_API_KEY
          ? { 'x-api-key': process.env.REQRES_API_KEY }
          : {},
      },
    },
  ],
});
