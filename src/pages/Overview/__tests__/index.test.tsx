import axios from "axios";
import { Auth } from "@aws-amplify/auth";
import { screen } from "@testing-library/react";
import { getMockSession } from "../../../context/auth/auth.dev";
import { OverviewPage } from "..";
import {
  ensureLoadingIsComplete,
  renderInProvider,
} from "../../../testHelpers";

describe("Overview", () => {
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

    renderInProvider(<OverviewPage />);

    await ensureLoadingIsComplete();

    expect(screen.getByText("User 1")).toBeInTheDocument();
  });
});
