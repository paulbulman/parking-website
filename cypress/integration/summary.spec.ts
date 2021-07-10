/// <reference types="cypress" />

describe("summary page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.mockLogin("Normal");
  });

  it("displays the request statuses for the current user", () => {
    checkCellText(/17 may/i, "Allocated");
    checkCellText(/18 may/i, "Allocated");
    checkCellText(/19 may/i, "Interrupted");

    checkCellText(/25 may/i, "Allocated");
    checkCellText(/26 may/i, "Allocated");
    checkCellText(/27 may/i, "Requested");
    checkCellText(/28 may/i, "Requested");
  });

  const checkCellText = (name: RegExp, expectedText: string) => {
    cy.findByRole("cell", { name: name }).should("contain.text", expectedText);
  };
});
