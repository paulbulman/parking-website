/// <reference types="cypress" />

describe("log in page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("redirects to the home page when login is successful", () => {
    cy.findByLabelText(/Email/i).type("user@example");
    cy.findByLabelText(/Password/i).type("pass");
    cy.findByRole("button", { name: /Log in/i }).click();

    cy.findByRole("button", { name: /Log in/i }).should("not.exist");
  });

  it("displays a notification when login is unsuccessful", () => {
    cy.findByLabelText(/Email/i).type("user@example");
    cy.findByLabelText(/Password/i).type("incorrect");
    cy.findByRole("button", { name: /Log in/i }).click();

    cy.findByText(
      /Your login details were incorrect. Please try again./i
    ).should("exist");
    cy.findByRole("button", { name: /Log in/i }).should("exist");
  });
});
