import axios from "axios";
import Auth from "@aws-amplify/auth";
import { render, screen, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "../../../context/auth";
import { getMockSession } from "../../../context/auth/auth.dev";
import { UsersPage } from "..";

describe("Users", () => {
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

  it("displays data from the users endpoint", async () => {
    Auth.currentSession = jest
      .fn()
      .mockResolvedValue(getMockSession("UserAdmin"));
    axios.get = jest.fn().mockReturnValueOnce({ data });

    act(() => {
      render(
        <AuthContextProvider>
          <QueryClientProvider client={queryClient}>
            <UsersPage />
          </QueryClientProvider>
        </AuthContextProvider>
      );
    });

    await waitFor(() => {
      expect(screen.queryByText("Loading")).not.toBeInTheDocument();
    });

    const [, dataRow] = screen.getAllByRole("row");

    expect(dataRow).toHaveTextContent("JohnDoe");
  });
});
