/// <reference types="cypress" />

describe("profile page", () => {
  beforeEach(() => {
    cy.mockLogin("TeamLeader");
    cy.visit("/profile");

    cy.fixture("profiles").then((body) => {
      cy.intercept({ url: "/profiles" }, { body });
    });
  });

  it("displays the current user's profile", () => {
    cy.findByLabelText("Registration number").should("have.value", "AB123CDE");
    cy.findByLabelText("Alternative registration number").should(
      "have.value",
      "X123XYZ"
    );
    cy.findByLabelText("Requests reminder").should("be.checked");
    cy.findByLabelText("Reservations reminder").should("not.be.checked");
  });

  it("sends the edited profile to the server", () => {
    cy.fixture("profiles").then((body) => {
      cy.intercept({ method: "PATCH", url: "/profiles" }, { body }).as(
        "profiles"
      );
    });

    cy.findByLabelText("Registration number")
      .clear()
      .type("__REGISTRATION_NUMBER__");
    cy.findByLabelText("Alternative registration number")
      .clear()
      .type("__ALTERNATIVE_REGISTRATION_NUMBER__");
    cy.findByLabelText("Requests reminder").click();
    cy.findByLabelText("Reservations reminder").click();

    cy.findByRole("button", { name: /save/i }).click();

    const expectedBody = JSON.stringify({
      registrationNumber: "__REGISTRATION_NUMBER__",
      alternativeRegistrationNumber: "__ALTERNATIVE_REGISTRATION_NUMBER__",
      requestReminderEnabled: false,
      reservationReminderEnabled: true,
    });

    cy.wait("@profiles").its("request.body").should("equal", expectedBody);
  });
});
