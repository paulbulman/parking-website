/// <reference types="cypress" />

import { mockLogin } from "../support/helpers";

describe("registration numbers page", () => {
  beforeEach(() => {
    mockLogin();
    cy.visit("/registration-numbers");

    cy.fixture("registrationNumbers").then((body) => {
      cy.intercept({ url: "/registrationNumbers/*" }, { body });
    });
  });

  it("displays the registration numbers", () => {
    cy.findByRole("textbox", { name: /registration number input/i }).type(
      "AB123CDE"
    );

    cy.findByRole("button", { name: /search icon/i }).click();

    checkRegistrationNumber(/ab123cde/i, /john doe/i);
  });

  const checkRegistrationNumber = (
    registrationNumber: RegExp,
    name: RegExp
  ) => {
    cy.findByRole("cell", { name: registrationNumber })
      .parent()
      .within(() => {
        cy.findByRole("cell", { name: name }).should("exist");
      });
  };
});
