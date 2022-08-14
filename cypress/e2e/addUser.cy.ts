/// <reference types="cypress" />

import { mockLogin } from "../support/helpers";

describe("add user page", () => {
  beforeEach(() => {
    mockLogin("UserAdmin");
    cy.visit("/users/add");

    cy.fixture("users").then((body) => {
      cy.intercept({ url: "/users" }, { body });
    });
  });

  it("sends the new user properties to the server", () => {
    cy.fixture("user").then((body) => {
      cy.intercept({ method: "POST", url: "/users" }, { body }).as(
        "createUser"
      );
    });

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

    const expectedBody = {
      emailAddress: "EMAIL@ADDRESS",
      firstName: "__FIRST_NAME__",
      lastName: "__LAST_NAME__",
      registrationNumber: "__REGISTRATION_NUMBER__",
      alternativeRegistrationNumber: "__ALTERNATIVE_REGISTRATION_NUMBER__",
      commuteDistance: 12.3,
    };

    cy.wait("@createUser")
      .its("request.body")
      .should("deep.equal", expectedBody);
  });
});
