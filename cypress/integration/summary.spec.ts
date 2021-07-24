/// <reference types="cypress" />

describe("summary page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.mockLogin("Normal");
  });

  it("displays the request statuses for the current user", () => {
    checkCellText(/17 may/i, "Interrupted");
    checkCellText(/18 may/i, "Allocated");
    checkCellText(/19 may/i, "Interrupted");

    checkCellText(/25 may/i, "Allocated");
    checkCellText(/26 may/i, "Allocated");
    checkCellText(/27 may/i, "Pending");
    checkCellText(/28 may/i, "Pending");
  });

  it("sends the stay interrupted request to the server", () => {
    cy.server();
    cy.route("PATCH", "/stayInterrupted").as("stayInterrupted");

    cy.findByRole("button", { name: "Stay interrupted" }).click();

    cy.wait("@stayInterrupted").its("request.body").should("deep.equal", {
      localDate: "2021-05-17",
      stayInterrupted: true,
    });
  });

  it("sends the re-request space request to the server", () => {
    cy.server();
    cy.route("PATCH", "/stayInterrupted").as("stayInterrupted");

    cy.findByRole("button", { name: "Stay interrupted" }).click();

    cy.wait("@stayInterrupted");

    cy.findByRole("button", { name: "Re-request space" }).click();

    cy.wait("@stayInterrupted").its("request.body").should("deep.equal", {
      localDate: "2021-05-17",
      stayInterrupted: false,
    });
  });

  it("redirects to the daily detail page when the link is clicked", () => {
    cy.findByRole("link", { name: "17 May" }).click();
    cy.findByRole("heading", { name: "Daily details" }).should("exist");
    cy.findByLabelText("Date").should("have.value", "17 May 2021");
  });

  it("redirects to the edit requests page when the link is clicked", () => {
    cy.findByRole("link", { name: "Edit requests" }).click();
    cy.findByRole("heading", { name: "Edit requests" }).should("exist");
  });

  const checkCellText = (name: RegExp, expectedText: string) => {
    cy.findByRole("cell", { name: name }).should("contain.text", expectedText);
  };
});
