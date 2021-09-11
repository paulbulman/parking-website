/// <reference types="cypress" />

describe("navigation", () => {
  const homeRegex = /home/i;
  const editRequestsRegex = /edit requests/i;
  const registrationNumbersRegex = /registration numbers/i;
  const editReservationsRegex = /edit reservations/i;
  const overrideRequestsRegex = /override requests/i;
  const usersRegex = /users/i;
  const profileRegex = /john/i;
  const faqRegex = /faq/i;
  const logOutRegex = /log out/i;

  context("when the user is on a desktop device", () => {
    beforeEach(() => {
      cy.viewport("macbook-11");
    });

    context("when the logged-in user is a regular user", () => {
      beforeEach(() => {
        cy.visit("/");
        cy.mockLogin();
      });

      it("redirects to the home page when the link is clicked", () => {
        // start from arbitrary other page
        cy.visit("/edit-requests");

        cy.findByRole("link", { name: homeRegex }).click();
        cy.findByRole("heading", { name: /summary/i }).should("exist");
      });

      it("redirects to the edit requests page when the link is clicked", () => {
        cy.findByRole("link", { name: editRequestsRegex }).click();
        cy.findByRole("heading", { name: /^edit requests$/i }).should("exist");
      });

      it("redirects to the registration numbers page when the link is clicked", () => {
        cy.findByRole("link", { name: registrationNumbersRegex }).click();
        cy.findByRole("heading", { name: /registration numbers/i }).should(
          "exist"
        );
      });

      it("redirects to the profile page when the link is clicked", () => {
        cy.findByRole("link", { name: profileRegex }).click();
        cy.findByRole("heading", { name: /edit profile/i }).should("exist");
      });

      it("redirects to the FAQ page when the link is clicked", () => {
        cy.findByRole("link", { name: faqRegex }).click();
        cy.findByRole("heading", { name: /faq/i }).should("exist");
      });

      it("logs the user out when the link is clicked", () => {
        cy.findByRole("link", { name: logOutRegex }).click();
        cy.findByRole("heading", { name: /^log in$/i }).should("exist");
      });

      it("does not render the edit reservations link", () => {
        ensureNavigationBarIsLoaded();
        cy.findByRole("link", { name: editReservationsRegex }).should(
          "not.exist"
        );
      });

      it("does not render the override requests link", () => {
        ensureNavigationBarIsLoaded();
        cy.findByRole("link", { name: overrideRequestsRegex }).should(
          "not.exist"
        );
      });

      it("does not render the users link", () => {
        ensureNavigationBarIsLoaded();
        cy.findByRole("link", { name: usersRegex }).should("not.exist");
      });
    });

    context("when the logged-in user is a team leader user", () => {
      beforeEach(() => {
        cy.visit("/");
        cy.mockLogin("TeamLeader");
      });

      it("redirects to the edit reservations page when the link is clicked", () => {
        cy.findByRole("link", { name: editReservationsRegex }).click();
        cy.findByRole("heading", { name: /^edit reservations$/i }).should(
          "exist"
        );
      });

      it("redirects to the override requests page when the link is clicked", () => {
        cy.findByRole("link", { name: overrideRequestsRegex }).click();
        cy.findByRole("heading", { name: /^override requests$/i }).should(
          "exist"
        );
      });

      it("does not render the users link when the user is not an admin user", () => {
        ensureNavigationBarIsLoaded();
        cy.findByRole("link", { name: usersRegex }).should("not.exist");
      });
    });

    context("when the logged-in user is an admin user", () => {
      beforeEach(() => {
        cy.visit("/");
        cy.mockLogin("UserAdmin");
      });

      it("redirects to the users page when the link is clicked", () => {
        cy.findByRole("link", { name: usersRegex }).click();
        cy.findByRole("heading", { name: /^users$/i }).should("exist");
      });

      it("does not render the edit reservations link when the user is not a team leader user", () => {
        ensureNavigationBarIsLoaded();

        cy.findByRole("link", { name: editReservationsRegex }).should(
          "not.exist"
        );
      });

      it("does not render the override requests link when the user is not a team leader user", () => {
        ensureNavigationBarIsLoaded();
        cy.findByRole("link", { name: overrideRequestsRegex }).should(
          "not.exist"
        );
      });
    });
  });

  context("when the user is on a mobile device", () => {
    beforeEach(() => {
      cy.viewport("iphone-x");
    });

    it("toggles the menu when the hamburger is clicked", () => {
      cy.visit("/");
      cy.mockLogin();

      ensureNavigationBarIsLoaded();
      cy.findByRole("link", { name: registrationNumbersRegex }).should(
        "not.exist"
      );

      cy.findByRole("button", { name: /menu/i }).click();

      cy.findByRole("link", { name: registrationNumbersRegex }).should("exist");
      cy.findByRole("link", { name: profileRegex }).should("exist");
      cy.findByRole("link", { name: logOutRegex }).should("exist");

      cy.findByRole("button", { name: /menu/i }).click();

      cy.findByRole("link", { name: registrationNumbersRegex }).should(
        "not.exist"
      );
    });
  });

  const ensureNavigationBarIsLoaded = () => {
    cy.findByRole("link", { name: homeRegex }).should("exist");
  };
});
