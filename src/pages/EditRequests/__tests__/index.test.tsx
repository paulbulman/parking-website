import { Auth } from "@aws-amplify/auth";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getMockSession } from "../../../context/auth/auth.dev";
import { EditRequestsPage } from "..";
import {
  ensureLoadingIsComplete,
  renderInProvider,
} from "../../../testHelpers";

describe("Edit requests", () => {
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

    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve(data),
    }) as jest.Mock;

    renderInProvider(<EditRequestsPage />);

    await ensureLoadingIsComplete();

    const requestCheckbox = screen.getByRole("checkbox", { name: "17 May" });
    expect(requestCheckbox).toBeInTheDocument();
  });

  it("sends changes to the requests endpoint", async () => {
    Auth.currentSession = jest.fn().mockResolvedValue(getMockSession("Normal"));

    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(data),
    }) as jest.Mock;

    renderInProvider(<EditRequestsPage />);

    await ensureLoadingIsComplete();

    const requestCheckbox = screen.getByRole("checkbox", { name: "17 May" });
    const saveButton = screen.getByRole("button", { name: "Save" });

    await userEvent.click(requestCheckbox);
    await userEvent.click(saveButton);

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringMatching(/\/requests$/),
        {
          method: "PATCH",
          headers: {
            Authorization: expect.stringContaining("Bearer"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requests: [{ localDate: "2021-05-17", requested: true }],
          }),
        }
      )
    );
  });
});
