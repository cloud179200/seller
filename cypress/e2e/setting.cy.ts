import { API_MESSAGE } from "@/app/config/constant";
import { TESTING_DATA } from "@/app/config/test";

describe("Change notification", () => {

  beforeEach(() => {
    cy.task("resetLogin");
    cy.visit("/auth/login");
  });

  it("Should Change notification settings success", () => {
    // login with the valid credentials
    cy.get("[data-cy=\"email\"]").type(TESTING_DATA.USER_EMAIL);
    cy.get("[data-cy=\"password\"]").type(TESTING_DATA.USER_PASSWORD);
    cy.get("[data-cy=\"button-login-default\"]").click();
    // assert that the user is logged in
    cy.url().should("not.include", "/auth/login");
    cy.get("[data-cy=\"email-display\"]").should("contain", TESTING_DATA.USER_EMAIL);
    cy.url().should("include", "/dashboard");
    cy.get("[data-cy=\"menu-button\"]").click();
    cy.get("[data-cy=\"settings-button\"]").click();
    cy.url().should("include", "/setting");

    cy.get("[data-cy=\"tab-notifications\"]").click();
       
    cy.get("[data-cy^=\"checkbox-\"]").each(($el) => {
      cy.wrap($el).click();
      cy.get(".toast-success > div").last().should("contain", API_MESSAGE.UPDATE_SUCCESS);
      cy.wait(3000);
    });

    cy.get("[data-cy^=\"checkbox-\"]").each(($el) => {
      cy.wrap($el).click();
      cy.get(".toast-success > div").last().should("contain", API_MESSAGE.UPDATE_SUCCESS);
      cy.wait(3000);
    });
  });
});