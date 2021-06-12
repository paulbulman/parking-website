import axios from "axios";
import Auth from "@aws-amplify/auth";
import { MemoryRouter } from "react-router-dom";
import { render, screen, act, waitFor } from "@testing-library/react";
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

    userEvent.type(screen.getByLabelText(/First name/i), "__FIRST_NAME__");
    userEvent.type(screen.getByLabelText(/Last name/i), "__LAST_NAME__");
    userEvent.type(screen.getByLabelText(/^Email$/i), "__EMAIL@ADDRESS__");
    userEvent.type(
      screen.getByLabelText(/^Confirm email$/i),
      "__EMAIL@ADDRESS__"
    );

    userEvent.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringMatching(/\/users$/),
        {
          firstName: "__FIRST_NAME__",
          lastName: "__LAST_NAME__",
          emailAddress: "__EMAIL@ADDRESS__",
        },
        expect.objectContaining({
          headers: { Authorization: expect.stringContaining("Bearer") },
        })
      )
    );
  });
});
