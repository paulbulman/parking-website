import axios from "axios";
import Auth from "@aws-amplify/auth";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "../../../context/auth";
import { getMockSession } from "../../../context/auth/auth.dev";
import { EditRequestsPage } from "..";

describe("Edit requests", () => {
  const queryClient = new QueryClient();

  const data = {
    requests: {
      weeks: [
        {
          days: [
            {
              localDate: "2021-05-17",
              data: { requested: false },
              hidden: false,
            },
          ],
        },
      ],
    },
  };

  it("displays data from the requests endpoint", async () => {
    Auth.currentSession = jest.fn().mockResolvedValue(getMockSession("Normal"));
    axios.get = jest.fn().mockReturnValueOnce({ data });

    act(() => {
      render(
        <AuthContextProvider>
          <QueryClientProvider client={queryClient}>
            <EditRequestsPage />
          </QueryClientProvider>
        </AuthContextProvider>
      );
    });

    await waitFor(() =>
      expect(
        screen.getByRole("checkbox", { name: "17 May" })
      ).toBeInTheDocument()
    );
  });

  it("sends changes to the requests endpoint", async () => {
    Auth.currentSession = jest.fn().mockResolvedValue(getMockSession("Normal"));
    axios.get = jest.fn().mockReturnValueOnce({ data });
    axios.patch = jest.fn().mockReturnValueOnce({ data });

    act(() => {
      render(
        <AuthContextProvider>
          <QueryClientProvider client={queryClient}>
            <EditRequestsPage />
          </QueryClientProvider>
        </AuthContextProvider>
      );
    });

    await waitFor(() =>
      expect(
        screen.getByRole("checkbox", { name: "17 May" })
      ).toBeInTheDocument()
    );

    userEvent.click(screen.getByRole("checkbox", { name: "17 May" }));
    userEvent.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() =>
      expect(axios.patch).toHaveBeenCalledWith(
        expect.stringMatching(/\/requests$/),
        {
          requests: [{ localDate: "2021-05-17", requested: true }],
        },
        expect.objectContaining({
          headers: { Authorization: expect.stringContaining("Bearer") },
        })
      )
    );
  });
});
