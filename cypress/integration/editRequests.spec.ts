/// <reference types="cypress" />

describe("edit requests page", () => {
  beforeEach(() => {
    cy.visit("/edit-requests");
    cy.mockLogin();
  });

  it("displays the existing requests for the current user", () => {
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
    cy.route("PATCH", "/requests").as("requests");

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

  it("displays a message when the edited requests are saved", () => {
    cy.findByRole("checkbox", { name: /17 may/i }).check();
    cy.findByRole("checkbox", { name: /18 may/i }).uncheck();

    cy.findByRole("button", { name: /save/i }).click();

    cy.findByRole("alert").should("have.text", "Requests saved successfully.");
  });
});
