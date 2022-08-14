import { Auth } from "@aws-amplify/auth";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getMockSession } from "../../../context/auth/auth.dev";
import { EditReservationsPage } from "..";
import {
  ensureLoadingIsComplete,
  renderInProvider,
} from "../../../testHelpers";

describe("Edit reservations", () => {
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

    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve(data),
    }) as jest.Mock;

    renderInProvider(<EditReservationsPage />);

    await ensureLoadingIsComplete();

    const reservationSelect = screen.getAllByRole("combobox")[0];

    expect(reservationSelect).toHaveDisplayValue(["User 1"]);
  });

  it("sends changes to the reservations endpoint", async () => {
    Auth.currentSession = jest
      .fn()
      .mockResolvedValue(getMockSession("TeamLeader"));

    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(data),
    }) as jest.Mock;

    renderInProvider(<EditReservationsPage />);

    await ensureLoadingIsComplete();

    const reservationSelect = screen.getAllByRole("combobox")[0];
    const saveButton = screen.getByRole("button", { name: "Save" });

    await userEvent.selectOptions(reservationSelect, "User 2");
    await userEvent.click(saveButton);

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringMatching(/\/reservations$/),
        {
          method: "PATCH",
          headers: {
            Authorization: expect.stringContaining("Bearer"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reservations: [{ localDate: "2021-05-17", userIds: ["user2"] }],
          }),
        }
      )
    );
  });
});
