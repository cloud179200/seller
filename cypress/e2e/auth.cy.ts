import { API_MESSAGE, NAME_TRANS_EN, TESTING_DATA } from '../../app/config/constant';

describe('Login', () => {

  beforeEach(() => {
    cy.task("resetLogin");
    cy.visit('/auth/login');
  });

  it('Should login with valid credentials', () => {
    const validCredentials = {
      email: TESTING_DATA.USER_EMAIL,
      password: TESTING_DATA.USER_PASSWORD,
    };
    // login with the valid credentials
    cy.get('[data-cy="email"]').type(validCredentials.email)
    cy.get('[data-cy="password"]').type(validCredentials.password)
    cy.get('[data-cy="button-login-default"]').click();
    // assert that the user is logged in
    cy.url().should('not.include', '/auth/login');
    cy.get('[data-cy="email-display"]').should('contain', validCredentials.email);
  });

  it('Should logout', () => {
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


  it('Should login with invalid credentials', () => {
    const invalidCredentials = {
      email: TESTING_DATA.USER_EMAIL,
      password: TESTING_DATA.USER_PASSWORD + "@",
    };

    // login with the valid credentials
    cy.get('[data-cy="email"]').type(TESTING_DATA.USER_EMAIL)
    cy.get('[data-cy="password"]').type(TESTING_DATA.USER_PASSWORD + "@")
    cy.get('[data-cy="button-login-default"]').click();
    cy.get('.toast-error > div').last().should('contain', "Invalid email or password");;
    cy.url().should('include', '/auth/login');
  });
});

describe('Register', () => {

  before(() => {
    cy.task("resetRegister");
    cy.visit('/auth/register');
  });

  it('Should request register with success email sent', () => {
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

  before(() => {
    cy.task("resetEmailVerification");
    cy.visit("/auth/verify?emailVerifyToken=test")
  });

  it('Should verify email success', () => {
    cy.get('[data-cy="verify-message"]').should('contain', NAME_TRANS_EN.VERIFY_EMAIL_SUCCESS);
  });
});

describe('Change password', () => {

  before(() => {
    cy.task("resetLogin");
    cy.visit('/auth/login');
  });

  it('Should change password success', () => {
    const validCredentials = {
      email: TESTING_DATA.USER_EMAIL,
      password: TESTING_DATA.USER_PASSWORD,
    };
    cy.get('[data-cy="email"]').type(validCredentials.email)
    cy.get('[data-cy="password"]').type(validCredentials.password)
    cy.get('[data-cy="button-login-default"]').click();
    cy.url().should('not.include', '/auth/login');

    cy.get('[data-cy="email-display"]').should('contain', validCredentials.email);
    
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

  before(() => {
    cy.task("resetLogin");
    cy.visit('/auth/login');
  });

  it('Should change password success', () => {
    const validCredentials = {
      email: TESTING_DATA.USER_EMAIL,
      password: TESTING_DATA.USER_PASSWORD,
    };
    cy.get('[data-cy="email"]').type(validCredentials.email)
    cy.get('[data-cy="password"]').type(validCredentials.password)
    cy.get('[data-cy="button-login-default"]').click();
    cy.url().should('not.include', '/auth/login');

    cy.get('[data-cy="email-display"]').should('contain', validCredentials.email);
    
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy="menu-button"]').click();
    cy.get('[data-cy="settings-button"]').click();
    cy.url().should('include', '/settings');

    cy.get('[data-cy="old_password"]').type(TESTING_DATA.USER_PASSWORD+"@");
    cy.get('[data-cy="new_password"]').type(TESTING_DATA.USER_PASSWORD);
    cy.get('[data-cy="confirm_new_password"]').type(TESTING_DATA.USER_PASSWORD);
    cy.get('[data-cy="change-password-button"]').click();

    cy.get('.toast-error > div').last().should('contain', API_MESSAGE.UPDATE_FAIL);;
  });
});