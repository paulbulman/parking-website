/// <reference types="cypress" />

describe("edit user page", () => {
  beforeEach(() => {
    cy.mockLogin("UserAdmin");
    cy.visit("/users/edit/1");

    cy.fixture("user").then((user) => {
      cy.intercept({ url: "/users/1" }, { body: { user } });
    });
  });

  it("displays the existing user properties", () => {
    cy.findByLabelText("First name").should("have.value", "John");
    cy.findByLabelText("Last name").should("have.value", "Doe");
    cy.findByLabelText("Registration number").should("have.value", "AB123CDE");
    cy.findByLabelText("Alternative registration number").should(
      "have.value",
      "X123XYZ"
    );
    cy.findByLabelText("Commute distance (mi)").should("have.value", "2");
  });

  it("sends the updated user properties to the server", () => {
    cy.fixture("user").then((user) => {
      cy.intercept({ method: "PATCH", url: "/users/1" }, { body: { user } }).as(
        "users"
      );
    });

    cy.findByLabelText("First name").clear().type("__FIRST_NAME__");
    cy.findByLabelText("Last name").clear().type("__LAST_NAME__");
    cy.findByLabelText("Registration number")
      .clear()
      .type("__REGISTRATION_NUMBER__");
    cy.findByLabelText("Alternative registration number")
      .clear()
      .type("__ALTERNATIVE_REGISTRATION_NUMBER__");
    cy.findByLabelText("Commute distance (mi)").clear().type("12.3");

    cy.findByRole("button", { name: /save/i }).click();

    const expectedBody = JSON.stringify({
      firstName: "__FIRST_NAME__",
      lastName: "__LAST_NAME__",
      registrationNumber: "__REGISTRATION_NUMBER__",
      alternativeRegistrationNumber: "__ALTERNATIVE_REGISTRATION_NUMBER__",
      commuteDistance: 12.3,
    });

    cy.wait("@users").its("request.body").should("equal", expectedBody);
  });
});
