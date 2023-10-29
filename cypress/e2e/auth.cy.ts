import {it, describe} from "cypress"
// Define a custom type for the login credentials
export interface LoginCredentials {
  username: string;
  password: string;
};


// describe block groups related tests together
describe('Login', () => {

  // beforeEach runs before each test in the describe block
  beforeEach(() => {
    // visit the login page
    cy.visit('/auth/login');
  });

  // it block defines a single test
  it('should login with valid credentials', () => {
    // create a valid login credentials object
    const validCredentials: LoginCredentials = {
      username: 'username',
      password: 'password',
    };

    // login with the valid credentials
    cy.login(validCredentials);

    // assert that the user is logged in
    cy.url().should('not.include', '/auth/login');
    cy.get('[cy-data="username-display"]').should('contain', 'username');
  });

  it('should not login with invalid credentials', () => {
    // create an invalid login credentials object
    const invalidCredentials: LoginCredentials = {
      username: 'invalid-username',
      password: 'invalid-password',
    };

    // login with the invalid credentials
    cy.login(invalidCredentials);

    // assert that the user is not logged in
    cy.url().should('include', '/login');
    cy.get('[data-testid="username-display"]').should('not.exist');
  });
});
