/// <reference types="cypress" />

import { mockLogin } from "../support/helpers";

describe("override requests page", () => {
  beforeEach(() => {
    mockLogin("TeamLeader");
    cy.visit("/override-requests");

    cy.fixture("usersList").then((body) => {
      cy.intercept({ url: "/usersList" }, { body });
    });
    cy.fixture("requests").then((body) => {
      cy.intercept({ url: "/requests/1" }, { body });
    });
  });

  it("displays the existing requests", () => {
    cy.findByTitle(/user/i).select("John Doe");

    cy.findByRole("checkbox", { name: /17 may/i }).should("not.be.checked");
    cy.findByRole("checkbox", { name: /18 may/i }).should("be.checked");
    cy.findByRole("checkbox", { name: /19 may/i }).should("not.be.checked");
    cy.findByRole("checkbox", { name: /20 may/i }).should("be.checked");

    cy.findByRole("checkbox", { name: /25 may/i }).should("be.checked");
    cy.findByRole("checkbox", { name: /26 may/i }).should("not.be.checked");
    cy.findByRole("checkbox", { name: /27 may/i }).should("be.checked");
    cy.findByRole("checkbox", { name: /28 may/i }).should("not.be.checked");
  });

  it("sends the edited requests to the server", () => {
    cy.fixture("requests").then((body) => {
      cy.intercept({ method: "PATCH", url: "/requests/1" }, { body }).as(
        "requests"
      );
    });

    cy.findByTitle(/user/i).select("John Doe");

    cy.findByRole("checkbox", { name: /17 may/i }).check();
    cy.findByRole("checkbox", { name: /18 may/i }).uncheck();

    cy.findByRole("button", { name: /save/i }).click();

    const expectedBody = JSON.stringify({
      requests: [
        { localDate: "2021-05-17", requested: true },
        { localDate: "2021-05-18", requested: false },
      ],
    });

    cy.wait("@requests").its("request.body").should("equal", expectedBody);
  });
});
