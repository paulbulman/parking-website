/// <reference types="cypress" />

describe("profile page", () => {
  beforeEach(() => {
    cy.visit("/profile");
    cy.mockLogin();
  });

  it("displays the current user's profile", () => {
    cy.findByLabelText(/^registration number$/i).should(
      "have.value",
      "AB123CDE"
    );
    cy.findByLabelText(/alternative registration number/i).should(
      "have.value",
      "X123XYZ"
    );
  });

  it("sends the edited profile to the server", () => {
    cy.server();
    cy.route("PATCH", "/profiles").as("profiles");

    cy.findByLabelText(/^registration number$/i)
      .clear()
      .type("__REGISTRATION_NUMBER__");
    cy.findByLabelText(/alternative registration number/i)
      .clear()
      .type("__ALTERNATIVE_REGISTRATION_NUMBER__");

    cy.findByRole("button", { name: /save/i }).click();

    cy.wait("@profiles").its("request.body").should("deep.equal", {
      registrationNumber: "__REGISTRATION_NUMBER__",
      alternativeRegistrationNumber: "__ALTERNATIVE_REGISTRATION_NUMBER__",
    });
  });
});
