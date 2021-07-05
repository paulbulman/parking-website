/// <reference types="cypress" />

describe("summary page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.mockLogin();
  });

  it("displays the request statuses for the current user", () => {
    cy.findByRole("cell", { name: /17 may allocated/i }).should("exist");
    cy.findByRole("cell", { name: /18 may allocated/i }).should("exist");
    cy.findByRole("cell", { name: /19 may interrupted/i }).should("exist");

    cy.findByRole("cell", { name: /25 may allocated/i }).should("exist");
    cy.findByRole("cell", { name: /26 may allocated/i }).should("exist");
    cy.findByRole("cell", { name: /27 may requested/i }).should("exist");
    cy.findByRole("cell", { name: /28 may requested/i }).should("exist");
  });
});
