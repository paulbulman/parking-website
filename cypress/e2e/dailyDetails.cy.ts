/// <reference types="cypress" />

import { mockLogin } from "../support/helpers";

describe("daily details page", () => {
  beforeEach(() => {
    mockLogin("Normal");
    cy.visit("/daily-details?localDate=2021-05-17");

    cy.fixture("dailyDetails").then((body) => {
      cy.intercept({ url: "/dailyDetails" }, { body });
    });
  });

  it("displays the requests for the selected date", () => {
    cy.findByText("Allocated (2)")
      .parent()
      .within(() => {
        cy.findByText("User 1").should("exist");
        cy.findByText("User 3").should("exist");
      });

    cy.findByText("Interrupted (2)")
      .parent()
      .within(() => {
        cy.findByText("User 2").should("exist");
        cy.findByText("User 4").should("exist");
      });
  });

  it("shows requests for a new date when selected", () => {
    cy.findByLabelText("Date").click();
    cy.findByText("28").click();

    cy.findByText("Pending (4)")
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
    cy.findByText("28").click();
    cy.findByText("User 4").should("have.class", "has-text-weight-bold");
  });

  it("redirects to the summary page when the link is clicked", () => {
    cy.findByRole("link", { name: "Back to summary" }).click();
    cy.findByRole("heading", { name: "Summary" }).should("exist");
  });

  it("sends the stay interrupted request to the server", () => {
    cy.fixture("stayInterrupted").then((body) => {
      cy.intercept({ method: "PATCH", url: "/stayInterrupted" }, { body }).as(
        "stayInterrupted"
      );
    });

    cy.findByRole("button", { name: "Stay interrupted" }).click();

    cy.wait("@stayInterrupted")
      .its("request.body")
      .should(
        "equal",
        JSON.stringify({
          localDate: "2021-05-17",
          stayInterrupted: true,
        })
      );

    cy.findByRole("button", { name: "Re-request space" }).click();

    cy.wait("@stayInterrupted")
      .its("request.body")
      .should(
        "equal",
        JSON.stringify({
          localDate: "2021-05-17",
          stayInterrupted: false,
        })
      );
  });
});
