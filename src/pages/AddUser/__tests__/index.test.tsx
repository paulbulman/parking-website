import axios from "axios";
import Auth from "@aws-amplify/auth";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "../../../context/auth";
import { getMockSession } from "../../../context/auth/auth.dev";
import { AddUserPage } from "..";

describe("AddUser", () => {
  const queryClient = new QueryClient();

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
    axios.post = jest.fn().mockReturnValueOnce({ data });

    render(
      <MemoryRouter>
        <AuthContextProvider>
          <QueryClientProvider client={queryClient}>
            <AddUserPage />
          </QueryClientProvider>
        </AuthContextProvider>
      </MemoryRouter>
    );

    userEvent.type(screen.getByLabelText("Email"), "__EMAIL@ADDRESS__");
    userEvent.type(screen.getByLabelText("Confirm email"), "__EMAIL@ADDRESS__");
    userEvent.type(screen.getByLabelText("First name"), "__FIRST_NAME__");
    userEvent.type(screen.getByLabelText("Last name"), "__LAST_NAME__");
    userEvent.type(
      screen.getByLabelText("Registration number"),
      "__REGISTRATION_NUMBER__"
    );
    userEvent.type(
      screen.getByLabelText("Alternative registration number"),
      "__ALTERNATIVE_REGISTRATION_NUMBER__"
    );
    userEvent.type(screen.getByLabelText("Commute distance (mi)"), "12.3");

    userEvent.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringMatching(/\/users$/),
        {
          emailAddress: "__EMAIL@ADDRESS__",
          firstName: "__FIRST_NAME__",
          lastName: "__LAST_NAME__",
          registrationNumber: "__REGISTRATION_NUMBER__",
          alternativeRegistrationNumber: "__ALTERNATIVE_REGISTRATION_NUMBER__",
          commuteDistance: 12.3,
        },
        expect.objectContaining({
          headers: { Authorization: expect.stringContaining("Bearer") },
        })
      )
    );
  });
});
