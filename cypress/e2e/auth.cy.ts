describe('Login', () => {

  beforeEach(() => {
    cy.visit('/auth/login');
  });

  it('should login with valid credentials', () => {
    const validCredentials = {
      email: 'test@gmail.com',
      password: '123456',
    };
    // login with the valid credentials
    cy.get('[data-cy="email"]').type(validCredentials.email)
    cy.get('[data-cy="password"]').type(validCredentials.password)
    cy.get('[data-cy="button-login-default"]').click();
    // assert that the user is logged in
    cy.url().should('not.include', '/auth/login');
    cy.get('[data-cy="email-display"]').should('contain', validCredentials.email);
  });

  it('should logout', () => {
    const validCredentials = {
      email: 'test@gmail.com',
      password: '123456',
    };
    // login with the valid credentials
    cy.get('[data-cy="email"]').type(validCredentials.email)
    cy.get('[data-cy="password"]').type(validCredentials.password)
    cy.get('[data-cy="button-login-default"]').click();
    // assert that the user is logged in
    cy.url().should('not.include', '/auth/login');
    cy.get('[data-cy="email-display"]').should('contain', validCredentials.email);
    
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy="menu-button"]').click();
    cy.get('[data-cy="logout-button"]').click();
    cy.url().should('include', '/auth/login');
  });


  it('should login with invalid credentials', () => {
    const invalidCredentials = {
      email: 'test@gmail.com',
      password: '1234567',
    };

    // login with the valid credentials
    cy.get('[data-cy="email"]').type(invalidCredentials.email)
    cy.get('[data-cy="password"]').type(invalidCredentials.password)
    cy.get('[data-cy="button-login-default"]').click();
    // assert that the user is logged in
    cy.url().should('include', '/auth/login');
    cy.intercept('POST', '/api/auth/callback/credentials?').as("unauthorizedCallback")
    cy.wait('@unauthorizedCallback').its('response.statusCode').should('eq', 401)
  });
});
