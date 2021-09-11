/// <reference types="cypress" />

describe("override requests page", () => {
  beforeEach(() => {
    cy.visit("/override-requests");
    cy.mockLogin("TeamLeader");
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
    cy.server();
    cy.route("PATCH", "/requests/1").as("requests");

    cy.findByTitle(/user/i).select("John Doe");

    cy.findByRole("checkbox", { name: /17 may/i }).check();
    cy.findByRole("checkbox", { name: /18 may/i }).uncheck();

    cy.findByRole("button", { name: /save/i }).click();

    cy.wait("@requests")
      .its("request.body")
      .should("deep.equal", {
        requests: [
          { localDate: "2021-05-17", requested: true },
          { localDate: "2021-05-18", requested: false },
        ],
      });
  });
});
