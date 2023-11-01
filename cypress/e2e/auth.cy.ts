import { API_MESSAGE, NAME_TRANS_EN, TESTING_DATA } from '../../app/config/constant';

describe('Login', () => {

  beforeEach(() => {
    cy.task("resetLogin");
    cy.visit('/auth/login');
  });

  it('Should login with valid credentials', () => {
    // login with the valid credentials
    cy.get('[data-cy="email"]').type(TESTING_DATA.USER_EMAIL)
    cy.get('[data-cy="password"]').type(TESTING_DATA.USER_PASSWORD)
    cy.get('[data-cy="button-login-default"]').click();
    // assert that the user is logged in
    cy.url().should('not.include', '/auth/login');
    cy.get('[data-cy="email-display"]').should('contain', TESTING_DATA.USER_EMAIL);
  });

  it('Should logout', () => {
    cy.get('[data-cy="email"]').type(TESTING_DATA.USER_EMAIL)
    cy.get('[data-cy="password"]').type(TESTING_DATA.USER_PASSWORD)
    cy.get('[data-cy="button-login-default"]').click();

    cy.url().should('not.include', '/auth/login');
    cy.get('[data-cy="email-display"]').should('contain', TESTING_DATA.USER_EMAIL);
    
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy="menu-button"]').click();
    cy.get('[data-cy="logout-button"]').click();
    cy.url().should('include', '/auth/login');
  });


  it('Should login with invalid credentials', () => {
    cy.get('[data-cy="email"]').type(TESTING_DATA.USER_EMAIL)
    cy.get('[data-cy="password"]').type(TESTING_DATA.USER_PASSWORD + "@")
    cy.get('[data-cy="button-login-default"]').click();
    cy.get('.toast-error > div').last().should('be.visible');
    cy.url().should('include', '/auth/login');
  });
});

describe('Register', () => {

  before(() => {
    cy.visit('/auth/register');
  });

  it('Should request register with success email sent', () => {
    cy.task("resetRegister");
    cy.get('[data-cy="first-name"]').type(TESTING_DATA.USER_FIRST_NAME)
    cy.get('[data-cy="last-name"]').type(TESTING_DATA.USER_LAST_NAME)
    cy.get('[data-cy="email"]').type(TESTING_DATA.USER_EMAIL)
    cy.get('[data-cy="password"]').type(TESTING_DATA.USER_PASSWORD)
    cy.get('[data-cy="confirm-password"]').type(TESTING_DATA.USER_PASSWORD)
    cy.get('[data-cy="phone-number"]').type(TESTING_DATA.USER_PHONE_NUMBER)
    cy.get('[data-cy="button-register-default"]').click();

    cy.url({ timeout: 30000 }).should('include', '/auth/verify');
    cy.get('[data-cy="verify-message"]').should('contain', NAME_TRANS_EN.CHECK_EMAIL_FOR_VERIFY);
  });

  it('Should verify email success', () => {
    cy.task("resetEmailVerification");
    cy.visit("/auth/verify?emailVerifyToken="+TESTING_DATA.EMAIL_VERIFY_TOKEN)
    cy.get('[data-cy="verify-message"]').should('contain', NAME_TRANS_EN.VERIFY_EMAIL_SUCCESS);
  });
});

describe('Change password', () => {

  beforeEach(() => {
    cy.task("resetLogin");
    cy.visit('/auth/login');
  });

  it('Should change password success', () => {

    cy.get('[data-cy="email"]').type(TESTING_DATA.USER_EMAIL)
    cy.get('[data-cy="password"]').type(TESTING_DATA.USER_PASSWORD)
    cy.get('[data-cy="button-login-default"]').click();
    cy.url().should('not.include', '/auth/login');

    cy.get('[data-cy="email-display"]').should('contain', TESTING_DATA.USER_EMAIL);
    
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy="menu-button"]').click();
    cy.get('[data-cy="settings-button"]').click();
    cy.url().should('include', '/settings');

    cy.get('[data-cy="old_password"]').type(TESTING_DATA.USER_PASSWORD);
    cy.get('[data-cy="new_password"]').type(TESTING_DATA.USER_PASSWORD+"@");
    cy.get('[data-cy="confirm_new_password"]').type(TESTING_DATA.USER_PASSWORD+"@");
    cy.get('[data-cy="change-password-button"]').click();

    cy.get('.toast-success > div').last().should('contain', API_MESSAGE.UPDATE_SUCCESS);;
  });

  it('Should change password fail', () => {
    cy.get('[data-cy="email"]').type(TESTING_DATA.USER_EMAIL)
    cy.get('[data-cy="password"]').type(TESTING_DATA.USER_PASSWORD)
    cy.get('[data-cy="button-login-default"]').click();
    cy.url().should('not.include', '/auth/login');

    cy.get('[data-cy="email-display"]').should('contain', TESTING_DATA.USER_EMAIL);
    
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy="menu-button"]').click();
    cy.get('[data-cy="settings-button"]').click();
    cy.url().should('include', '/settings');

    cy.get('[data-cy="old_password"]').type(TESTING_DATA.USER_PASSWORD+"@tehe");
    cy.get('[data-cy="new_password"]').type(TESTING_DATA.USER_PASSWORD);
    cy.get('[data-cy="confirm_new_password"]').type(TESTING_DATA.USER_PASSWORD);
    cy.get('[data-cy="change-password-button"]').click();

    cy.get('.toast-error > div').last().should('be.visible')
  });
});