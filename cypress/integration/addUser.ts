/// <reference types="cypress" />

describe("add user page", () => {
  beforeEach(() => {
    cy.visit("/users/add");
    cy.mockLogin("UserAdmin");
  });

  it("sends the new user properties to the server", () => {
    cy.server();
    cy.route("POST", "/users").as("users");

    cy.findByLabelText(/^email$/i).type("EMAIL@ADDRESS");
    cy.findByLabelText(/confirm email/i).type("EMAIL@ADDRESS");
    cy.findByLabelText(/first name/i).type("__FIRST_NAME__");
    cy.findByLabelText(/last name/i).type("__LAST_NAME__");
    cy.findByLabelText(/^registration number$/i).type(
      "__REGISTRATION_NUMBER__"
    );
    cy.findByLabelText(/alternative registration number/i).type(
      "__ALTERNATIVE_REGISTRATION_NUMBER__"
    );
    cy.findByLabelText(/commute distance/i).type("12.3");

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
