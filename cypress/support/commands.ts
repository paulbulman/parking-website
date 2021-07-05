import "@testing-library/cypress/add-commands";

declare global {
  namespace Cypress {
    interface Chainable {
      mockLogin: typeof mockLogin;
    }
  }
}

const mockLogin = () => {
  window.localStorage.setItem("signedInUserType", "Normal");
};

Cypress.Commands.add("mockLogin", mockLogin);
