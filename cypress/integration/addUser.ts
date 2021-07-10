/// <reference types="cypress" />

describe("add user page", () => {
  beforeEach(() => {
    cy.visit("/users/add");
    cy.mockLogin("UserAdmin");
  });

  it("sends the new user properties to the server", () => {
    cy.server();
    cy.route("POST", "/users").as("users");

    cy.findByLabelText("Email").type("EMAIL@ADDRESS");
    cy.findByLabelText("Confirm email").type("EMAIL@ADDRESS");
    cy.findByLabelText("First name").type("__FIRST_NAME__");
    cy.findByLabelText("Last name").type("__LAST_NAME__");
    cy.findByLabelText("Registration number").type("__REGISTRATION_NUMBER__");
    cy.findByLabelText("Alternative registration number").type(
      "__ALTERNATIVE_REGISTRATION_NUMBER__"
    );
    cy.findByLabelText("Commute distance (mi)").type("12.3");

    cy.findByRole("button", { name: /save/i }).click();

    cy.wait("@users").its("request.body").should("deep.equal", {
      emailAddress: "EMAIL@ADDRESS",
      firstName: "__FIRST_NAME__",
      lastName: "__LAST_NAME__",
      registrationNumber: "__REGISTRATION_NUMBER__",
      alternativeRegistrationNumber: "__ALTERNATIVE_REGISTRATION_NUMBER__",
      commuteDistance: 12.3,
    });
  });
});
