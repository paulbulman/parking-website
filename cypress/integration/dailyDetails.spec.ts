/// <reference types="cypress" />

describe("daily details page", () => {
  beforeEach(() => {
    cy.visit("/daily-details?localDate=2021-05-17");
    cy.mockLogin("Normal");
  });

  it("displays the requests for the selected date", () => {
    cy.findByText("Allocated")
      .parent()
      .within(() => {
        cy.findByText("User 1").should("exist");
        cy.findByText("User 3").should("exist");
      });

    cy.findByText("Interrupted")
      .parent()
      .within(() => {
        cy.findByText("User 2").should("exist");
        cy.findByText("User 4").should("exist");
      });
  });

  it("shows requests for a new date when selected", () => {
    cy.findByLabelText("Date").click();
    cy.findByLabelText("Fri May 28 2021").click();

    cy.findByText("Pending")
      .parent()
      .within(() => {
        cy.findByText("User 1").should("exist");
        cy.findByText("User 2").should("exist");
        cy.findByText("User 3").should("exist");
        cy.findByText("User 4").should("exist");
      });
  });

  it("highlights the current user", () => {
    cy.findByText("User 4").should("have.class", "has-text-weight-bold");

    cy.findByLabelText("Date").click();
    cy.findByLabelText("Fri May 28 2021").click();
    cy.findByText("User 4").should("have.class", "has-text-weight-bold");
  });

  it("redirects to the summary page when the link is clicked", () => {
    cy.findByRole("link", { name: "Back to summary" }).click();
    cy.findByRole("heading", { name: "Summary" }).should("exist");
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
});
