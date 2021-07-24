import axios from "axios";
import Auth from "@aws-amplify/auth";
import { screen, act, waitFor } from "@testing-library/react";
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
    axios.get = jest.fn().mockReturnValueOnce({ data });

    act(() => {
      renderInProvider(<EditRequestsPage />);
    });

    await ensureLoadingIsComplete();

    const requestCheckbox = screen.getByRole("checkbox", { name: "17 May" });
    expect(requestCheckbox).toBeInTheDocument();
  });

  it("sends changes to the requests endpoint", async () => {
    Auth.currentSession = jest.fn().mockResolvedValue(getMockSession("Normal"));
    axios.get = jest.fn().mockReturnValueOnce({ data });
    axios.patch = jest.fn().mockReturnValueOnce({ data });

    act(() => {
      renderInProvider(<EditRequestsPage />);
    });

    await ensureLoadingIsComplete();

    const requestCheckbox = screen.getByRole("checkbox", { name: "17 May" });
    const saveButton = screen.getByRole("button", { name: "Save" });

    userEvent.click(requestCheckbox);
    userEvent.click(saveButton);

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
