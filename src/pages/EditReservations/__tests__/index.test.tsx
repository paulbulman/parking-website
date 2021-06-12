import axios from "axios";
import Auth from "@aws-amplify/auth";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "../../../context/auth";
import { getMockSession } from "../../../context/auth/auth.dev";
import { EditReservationsPage } from "..";

describe("Edit reservations", () => {
  const queryClient = new QueryClient();

  const data = {
    reservations: {
      weeks: [
        {
          days: [
            {
              localDate: "2021-05-17",
              data: { userIds: ["user1"] },
              hidden: false,
            },
          ],
        },
      ],
    },
    shortLeadTimeSpaces: 1,
    users: [
      { userId: "user1", name: "User 1" },
      { userId: "user2", name: "User 2" },
    ],
  };

  it("displays data from the reservations endpoint", async () => {
    Auth.currentSession = jest
      .fn()
      .mockResolvedValue(getMockSession("TeamLeader"));
    axios.get = jest.fn().mockReturnValueOnce({ data });

    act(() => {
      render(
        <AuthContextProvider>
          <QueryClientProvider client={queryClient}>
            <EditReservationsPage />
          </QueryClientProvider>
        </AuthContextProvider>
      );
    });

    await waitFor(() => {
      expect(screen.queryByText("Loading")).not.toBeInTheDocument();
    });

    const reservationSelect = screen.getAllByRole("combobox")[0];

    expect(reservationSelect).toHaveDisplayValue(["User 1"]);
  });

  it("sends changes to the reservations endpoint", async () => {
    Auth.currentSession = jest
      .fn()
      .mockResolvedValue(getMockSession("TeamLeader"));
    axios.get = jest.fn().mockReturnValueOnce({ data });
    axios.patch = jest.fn().mockReturnValueOnce({ data });

    act(() => {
      render(
        <AuthContextProvider>
          <QueryClientProvider client={queryClient}>
            <EditReservationsPage />
          </QueryClientProvider>
        </AuthContextProvider>
      );
    });

    await waitFor(() => {
      expect(screen.queryByText("Loading")).not.toBeInTheDocument();
    });

    const reservationSelect = screen.getAllByRole("combobox")[0];
    const saveButton = screen.getByRole("button", { name: "Save" });

    userEvent.selectOptions(reservationSelect, "User 2");
    userEvent.click(saveButton);

    await waitFor(() =>
      expect(axios.patch).toHaveBeenCalledWith(
        expect.stringMatching(/\/reservations$/),
        {
          reservations: [{ localDate: "2021-05-17", userIds: ["user2"] }],
        },
        expect.objectContaining({
          headers: { Authorization: expect.stringContaining("Bearer") },
        })
      )
    );
  });
});
