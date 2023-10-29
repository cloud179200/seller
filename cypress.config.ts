import { loadEnvConfig } from '@next/env';
import { defineConfig } from 'cypress';

const { combinedEnv } = loadEnvConfig(process.cwd());
export default defineConfig({
  env: combinedEnv,
  e2e: {
    // Specifies the directory where Cypress should look for spec files.
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    // Specifies the directory where Cypress should store screenshots and videos.
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',

    // Specifies the viewport width and height that Cypress should use when running tests.
    viewportWidth: 1280,
    viewportHeight: 720,

    // Specifies the amount of time that Cypress should wait for an element to become visible before failing the test.
    defaultCommandTimeout: 10000,
  }
});
