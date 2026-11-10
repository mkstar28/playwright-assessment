
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never'
    }]
  ],

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [

    {
      name: 'ui',

      testMatch: /ui\/.*\.spec\.ts$/,

      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
        testIdAttribute: 'data-test',
      },
    },

    {
      name: 'api',

      testMatch: /api\/.*\.spec\.ts$/,

      use: {
        baseURL: 'https://reqres.in',

        extraHTTPHeaders: process.env.REQRES_API_KEY
          ? { 'x-api-key': process.env.REQRES_API_KEY }
          : {},
      },
    },

  ],

});