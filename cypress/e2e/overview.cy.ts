/// <reference types="cypress" />

import { mockLogin } from "../support/helpers";

describe("overview page", () => {
  beforeEach(() => {
    mockLogin();
    cy.visit("/overview");

    cy.fixture("overview").then((body) => {
      cy.intercept({ url: "/overview" }, { body });
    });
  });

  it("displays the current requests", () => {
    checkUserIsAllocated(/17 may/i, /user 1/i);
    checkUserIsAllocated(/17 may/i, /user 3/i);

    checkUserIsInterrupted(/17 may/i, /user 2/i);
    checkUserIsInterrupted(/17 may/i, /user 4/i);

    checkUserIsAllocated(/28 may/i, /user 4/i);
    checkUserIsInterrupted(/28 may/i, /user 1/i);
    checkUserIsInterrupted(/28 may/i, /user 2/i);
    checkUserIsInterrupted(/28 may/i, /user 3/i);
  });

  it("highlights the current user", () => {
    checkUserIsHighlighted(/17 may/i, /user 4/i);
    checkUserIsHighlighted(/28 may/i, /user 4/i);
  });

  const checkUserIsAllocated = (date: RegExp, username: RegExp) => {
    cy.findByRole("cell", { name: date }).within(() => {
      cy.findByText(username)
        .parent()
        .should("have.class", "has-text-success-dark");
    });
  };

  const checkUserIsInterrupted = (date: RegExp, username: RegExp) => {
    cy.findByRole("cell", { name: date }).within(() => {
      cy.findByText(username).parent().should("have.class", "has-text-danger");
    });
  };

  const checkUserIsHighlighted = (date: RegExp, username: RegExp) => {
    cy.findByRole("cell", { name: date }).within(() => {
      cy.findByText(username).should("have.class", "has-text-weight-bold");
    });
  };
});
