/// <reference types="cypress" />

describe("edit reservations page", () => {
  beforeEach(() => {
    cy.mockLogin("TeamLeader");
    cy.visit("/edit-reservations");

    cy.fixture("reservations").then((body) => {
      cy.intercept({ url: "/reservations" }, { body });
    });
  });

  it("displays the existing reservations", () => {
    cy.findByRole("cell", { name: /17 may/i }).within(() => {
      cy.findByTitle(/reservation 1/i).should("have.value", "user1");
      cy.findByTitle(/reservation 1/i)
        .find("option:selected")
        .should("have.text", "User 1");

      cy.findByTitle(/reservation 2/i).should("have.value", "user3");
      cy.findByTitle(/reservation 2/i)
        .find("option:selected")
        .should("have.text", "User 3");

      cy.findByTitle(/reservation 3/i).should("have.value", "");
      cy.findByTitle(/reservation 4/i).should("have.value", "");
    });

    cy.findByRole("cell", { name: /28 may/i }).within(() => {
      cy.findByTitle(/reservation 1/i).should("have.value", "user4");
      cy.findByTitle(/reservation 1/i)
        .find("option:selected")
        .should("have.text", "User 4");

      cy.findByTitle(/reservation 2/i).should("have.value", "");
      cy.findByTitle(/reservation 3/i).should("have.value", "");
      cy.findByTitle(/reservation 4/i).should("have.value", "");
    });
  });

  it("sends the edited reservations to the server", () => {
    cy.fixture("reservations").then((body) => {
      cy.intercept({ method: "PATCH", url: "/reservations" }, { body }).as(
        "reservations"
      );
    });

    cy.findByRole("cell", { name: /17 may/i }).within(() => {
      cy.findByTitle(/reservation 1/i).select("Select");
      cy.findByTitle(/reservation 2/i).select("Select");
    });

    cy.findByRole("cell", { name: /18 may/i }).within(() => {
      cy.findByTitle(/reservation 3/i).select("User 1");
      cy.findByTitle(/reservation 4/i).select("User 2");
    });

    cy.findByRole("button", { name: /save/i }).click();

    const expectedBody = JSON.stringify({
      reservations: [
        { localDate: "2021-05-17", userIds: ["", "", "", ""] },
        { localDate: "2021-05-18", userIds: ["", "", "user1", "user2"] },
      ],
    });

    cy.wait("@reservations").its("request.body").should("equal", expectedBody);
  });
});
