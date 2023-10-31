import { loadEnvConfig } from '@next/env';
import { defineConfig } from 'cypress';
import config from "./app/config"
const { combinedEnv } = loadEnvConfig(process.cwd());
export default defineConfig({
  projectId: "myj8ut",
  env: combinedEnv,
  e2e: {
    baseUrl: config.BASE_URL,
    retries: {
      runMode: 3,
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: config.NODE_ENV === "test",
    // Specifies the directory where Cypress should look for spec files.
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    // Specifies the directory where Cypress should store screenshots and videos.
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    // Specifies the amount of time that Cypress should wait for an element to become visible before failing the test.
    defaultCommandTimeout: 10000,
  }
});
