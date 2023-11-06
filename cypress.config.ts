import dotenv from "dotenv";
dotenv.config();
import { defineConfig } from "cypress";
import { resetLogin, resetRegister, resetEmailVerification } from "./cypress/tasks/auth";
import config from "./app/config";
export default defineConfig({
  projectId: "myj8ut",
  env: config,
  supportFolder: "cypress/support",
  e2e: {
    baseUrl: config.BASE_URL,
    retries: {
      runMode: 3,
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: config.NODE_ENV === "development",
    // Specifies the directory where Cypress should look for spec files.
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    // Specifies the directory where Cypress should store screenshots and videos.
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    // Specifies the amount of time that Cypress should wait for an element to become visible before failing the test.
    defaultCommandTimeout: 10000,
    taskTimeout: 15000,
    setupNodeEvents(on, _config) {
      on("task", {
        resetLogin,
        resetRegister,
        resetEmailVerification
      });
    }
  }
});
