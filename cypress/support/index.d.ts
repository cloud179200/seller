import './commands';

type Method = 'POST' | 'GET' | 'DELETE';

declare global {
  namespace Cypress {
    interface Chainable {
      dataCy(value: string): Chainable<Element>;
      interceptRequest(method: Method): Chainable<null>;
      login(cre: LoginCredential): Chainable<any>
    }
  }
}