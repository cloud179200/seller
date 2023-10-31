import { NAME_TRANS_EN } from '../../app/config/constant';

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
    cy.get('.toast-error > div').last().should('contain', "Invalid email or password");;
    cy.url().should('include', '/auth/login');
  });
});

describe('Register', () => {

  before(() => {
    cy.visit('/auth/register');
  });

  it('should request register with success', () => {
    const registerBody = {
      firstName: 'le',
      lastName: 'viet anh',
      email: 'test@gmail.com',
      password: '123456',
      phoneNumber: "0394252608"
    };
    cy.get('[data-cy="first-name"]').type(registerBody.firstName)
    cy.get('[data-cy="last-name"]').type(registerBody.lastName)
    cy.get('[data-cy="email"]').type(registerBody.email)
    cy.get('[data-cy="password"]').type(registerBody.password)
    cy.get('[data-cy="confirm-password"]').type(registerBody.password)
    cy.get('[data-cy="phone-number"]').type(registerBody.phoneNumber)
    cy.get('[data-cy="button-register-default"]').click();

    cy.url({ timeout: 30000 }).should('include', '/auth/verify');
    cy.get('[data-cy="verify-message"]').should('contain', NAME_TRANS_EN.CHECK_EMAIL_FOR_VERIFY);
  });

  it('should verify email success', () => {
    cy.visit("/auth/verify?emailVerifyToken=test")
    cy.get('[data-cy="verify-message"]').should('contain', NAME_TRANS_EN.VERIFY_EMAIL_SUCCESS);
  });
});