/// <reference types="cypress" />

import { mockLogin } from "../support/helpers";

describe("users page", () => {
  beforeEach(() => {
    mockLogin("UserAdmin");
    cy.visit("/users");

    cy.fixture("users").then((body) => {
      cy.intercept({ url: "/users" }, { body });
    });
  });

  it("displays the existing users", () => {
    cy.findByRole("cell", { name: /John/ })
      .parent()
      .within(() => {
        cy.findByRole("cell", { name: /Doe/ }).should("exist");
        cy.findByRole("cell", { name: /AB123CDE/ }).should("exist");
        cy.findByRole("cell", { name: /X123XYZ/ }).should("exist");
        cy.findByRole("cell", { name: /^2$/ }).should("exist");
      });

    cy.findByRole("cell", { name: /Ann/ })
      .parent()
      .within(() => {
        cy.findByRole("cell", { name: /Other/ }).should("exist");
        cy.findByRole("cell", { name: /XY789XYZ/ }).should("exist");
        cy.findByRole("cell", { name: /A789ABC/ }).should("exist");
        cy.findByRole("cell", { name: /^3$/ }).should("exist");
      });
  });

  it("redirects to the add new user page when the button is clicked", () => {
    cy.findByRole("link", { name: /add new user/i }).click();
    cy.findByRole("heading", { name: /add new user/i }).should("exist");
  });

  it("redirects to the edit user page when the edit button is clicked", () => {
    cy.fixture("user").then((user) => {
      cy.intercept({ url: "/users/1" }, { body: { user } });
    });

    cy.findByRole("cell", { name: /John/ })
      .parent()
      .within(() => {
        cy.findByRole("img", { name: /edit user/i }).click();
      });

    cy.findByRole("heading", { name: /edit user/i }).should("exist");
    cy.findByLabelText("First name").should("have.value", "John");
  });

  it("sends the request to the server when the delete button is clicked", () => {
    cy.intercept({ url: "/users/1" }, { statusCode: 204 }).as("user");

    cy.findByRole("cell", { name: /John/ })
      .parent()
      .within(() => {
        cy.findByRole("img", { name: /delete user/i }).click();
      });

    cy.wait("@user");
  });
});
