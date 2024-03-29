/// <reference types="cypress" />

describe("log in page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("redirects to the home page when login is successful", () => {
    cy.findByLabelText("Email").type("user@example");
    cy.findByLabelText("Password").type("pass");
    cy.findByRole("button", { name: /log in/i }).click();

    cy.findByRole("heading", { name: /summary/i }).should("exist");
  });

  it("displays a notification when login is unsuccessful", () => {
    cy.findByLabelText("Email").type("user@example");
    cy.findByLabelText("Password").type("incorrect");
    cy.findByRole("button", { name: /log in/i }).click();

    cy.findByRole("alert").should(
      "have.text",
      "Your login details were incorrect. Please try again."
    );
    cy.findByRole("heading", { name: /^Log in$/i }).should("exist");
  });
});
