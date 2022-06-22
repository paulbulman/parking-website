import { Auth } from "@aws-amplify/auth";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getMockSession } from "../../../context/auth/auth.dev";
import { AddUserPage } from "..";
import { renderInProvider } from "../../../testHelpers";

describe("AddUser", () => {
  const data = {
    users: [
      {
        userId: 1,
        alternativeRegistrationNumber: "",
        commuteDistance: null,
        firstName: "John",
        lastName: "Doe",
        registrationNumber: "",
      },
    ],
  };

  it("sends entered data to the users endpoint", async () => {
    Auth.currentSession = jest
      .fn()
      .mockResolvedValue(getMockSession("UserAdmin"));

    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve(data),
    }) as jest.Mock;

    renderInProvider(<AddUserPage />);

    await userEvent.type(screen.getByLabelText("Email"), "__EMAIL@ADDRESS__");
    await userEvent.type(
      screen.getByLabelText("Confirm email"),
      "__EMAIL@ADDRESS__"
    );
    await userEvent.type(screen.getByLabelText("First name"), "__FIRST_NAME__");
    await userEvent.type(screen.getByLabelText("Last name"), "__LAST_NAME__");
    await userEvent.type(
      screen.getByLabelText("Registration number"),
      "__REGISTRATION_NUMBER__"
    );
    await userEvent.type(
      screen.getByLabelText("Alternative registration number"),
      "__ALTERNATIVE_REGISTRATION_NUMBER__"
    );
    await userEvent.type(
      screen.getByLabelText("Commute distance (mi)"),
      "12.3"
    );

    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringMatching(/\/users$/),
        {
          method: "POST",
          headers: { Authorization: expect.stringContaining("Bearer") },
          body: JSON.stringify({
            emailAddress: "__EMAIL@ADDRESS__",
            firstName: "__FIRST_NAME__",
            lastName: "__LAST_NAME__",
            registrationNumber: "__REGISTRATION_NUMBER__",
            alternativeRegistrationNumber:
              "__ALTERNATIVE_REGISTRATION_NUMBER__",
            commuteDistance: 12.3,
          }),
        }
      )
    );
  });
});
