import axios from "axios";
import Auth from "@aws-amplify/auth";
import { render, screen, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "../../../context/auth";
import { getMockSession } from "../../../context/auth/auth.dev";
import { OverviewPage } from "..";

describe("Overview", () => {
  const queryClient = new QueryClient();

  const data = {
    overview: {
      weeks: [
        {
          days: [
            {
              localDate: "2021-05-17",
              data: {
                allocatedUsers: [{ name: "User 1", isHighlighted: true }],
                interruptedUsers: [],
              },
              hidden: false,
            },
          ],
        },
      ],
    },
  };

  it("displays data from the overview endpoint", async () => {
    Auth.currentSession = jest.fn().mockResolvedValue(getMockSession("Normal"));
    axios.get = jest.fn().mockReturnValueOnce({ data });

    act(() => {
      render(
        <AuthContextProvider>
          <QueryClientProvider client={queryClient}>
            <OverviewPage />
          </QueryClientProvider>
        </AuthContextProvider>
      );
    });

    await waitFor(() => {
      expect(screen.queryByText("Loading")).not.toBeInTheDocument();
    });

    expect(screen.getByText("User 1")).toBeInTheDocument();
  });
});
