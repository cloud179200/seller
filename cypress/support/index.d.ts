import "./commands";

declare global {
  namespace Cypress {
    interface Chainable {
      dataCy: (value: string) => Chainable<Element>;
      // * tasks
      task(
        event: "resetLogin",
        arg?: any,
        options?: Partial<Loggable & Timeoutable>
      ): Chainable<any>;
      task(
        event: "resetRegister",
        arg?: any,
        options?: Partial<Loggable & Timeoutable>
      ): Chainable<any>,
      task(
        event: "resetEmailVerification",
        arg?: any,
        options?: Partial<Loggable & Timeoutable>
      ): Chainable<any>;
    }
  }
}