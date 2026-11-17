import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/integration', workers: 1, reporter: 'list',
  outputDir: '.verification/integration-results',
  use: { baseURL: 'http://127.0.0.1:4323', trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  webServer: {
    command: 'node tests/serve.mjs --combined',
    url: 'http://127.0.0.1:4323', reuseExistingServer: false,
  },
});
