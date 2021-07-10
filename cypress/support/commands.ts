import { UserType } from "../../src/context/auth/auth.dev.types";

import "@testing-library/cypress/add-commands";

declare global {
  namespace Cypress {
    interface Chainable {
      mockLogin: typeof mockLogin;
    }
  }
}

const mockLogin = (userType: UserType = "Normal") => {
  window.localStorage.setItem("signedInUserType", userType);
};

Cypress.Commands.add("mockLogin", mockLogin);
