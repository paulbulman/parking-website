/// <reference types="cypress" />

describe("profile page", () => {
  beforeEach(() => {
    cy.visit("/profile");
    cy.mockLogin("TeamLeader");
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
    cy.server();
    cy.route("PATCH", "/profiles").as("profiles");

    cy.findByLabelText("Registration number")
      .clear()
      .type("__REGISTRATION_NUMBER__");
    cy.findByLabelText("Alternative registration number")
      .clear()
      .type("__ALTERNATIVE_REGISTRATION_NUMBER__");
    cy.findByLabelText("Requests reminder").click();
    cy.findByLabelText("Reservations reminder").click();

    cy.findByRole("button", { name: /save/i }).click();

    cy.wait("@profiles").its("request.body").should("deep.equal", {
      registrationNumber: "__REGISTRATION_NUMBER__",
      alternativeRegistrationNumber: "__ALTERNATIVE_REGISTRATION_NUMBER__",
      requestReminderEnabled: false,
      reservationReminderEnabled: true,
    });
  });
});
