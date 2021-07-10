/// <reference types="cypress" />

describe("registration numbers page", () => {
  beforeEach(() => {
    cy.visit("/registration-numbers");
    cy.mockLogin();
  });

  it("displays the registration numbers", () => {
    checkRegistrationNumber(/ab123cde/i, /john doe/i);
    checkRegistrationNumber(/xy789xyz/i, /ann other/i);
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
