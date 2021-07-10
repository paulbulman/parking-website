/// <reference types="cypress" />

describe("edit user page", () => {
  beforeEach(() => {
    cy.visit("/users/edit/1");
    cy.mockLogin("UserAdmin");
  });

  it("displays the existing user properties", () => {
    cy.findByLabelText(/first name/i).should("have.value", "John");
    cy.findByLabelText(/last name/i).should("have.value", "Doe");
    cy.findByLabelText(/^registration number$/i).should(
      "have.value",
      "AB123CDE"
    );
    cy.findByLabelText(/alternative registration number/i).should(
      "have.value",
      "X123XYZ"
    );
    cy.findByLabelText(/commute distance/i).should("have.value", "2");
  });

  it("sends the updated user properties to the server", () => {
    cy.server();
    cy.route("PATCH", "/users/1").as("users");

    cy.findByLabelText(/first name/i)
      .clear()
      .type("__FIRST_NAME__");
    cy.findByLabelText(/last name/i)
      .clear()
      .type("__LAST_NAME__");
    cy.findByLabelText(/^registration number$/i)
      .clear()
      .type("__REGISTRATION_NUMBER__");
    cy.findByLabelText(/alternative registration number/i)
      .clear()
      .type("__ALTERNATIVE_REGISTRATION_NUMBER__");
    cy.findByLabelText(/commute distance/i)
      .clear()
      .type("12.3");

    cy.findByRole("button", { name: /save/i }).click();

    cy.wait("@users").its("request.body").should("deep.equal", {
      firstName: "__FIRST_NAME__",
      lastName: "__LAST_NAME__",
      registrationNumber: "__REGISTRATION_NUMBER__",
      alternativeRegistrationNumber: "__ALTERNATIVE_REGISTRATION_NUMBER__",
      commuteDistance: 12.3,
    });
  });
});
