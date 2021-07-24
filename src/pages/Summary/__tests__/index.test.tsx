import axios from "axios";
import Auth from "@aws-amplify/auth";
import { screen, act } from "@testing-library/react";
import { getMockSession } from "../../../context/auth/auth.dev";
import { SummaryPage } from "..";
import {
  ensureLoadingIsComplete,
  renderInProvider,
} from "../../../testHelpers";

interface getDataParameters {
  isAllowed: boolean;
  isActive: boolean;
}

describe("Summary", () => {
  const getData = ({ isAllowed, isActive }: getDataParameters) => {
    return {
      summary: {
        weeks: [
          {
            days: [
              {
                localDate: "2021-05-17",
                data: { status: "interrupted", isProblem: true },
                hidden: false,
              },
            ],
          },
        ],
      },
      stayInterruptedStatus: {
        localDate: "2021-05-17",
        isAllowed,
        isActive,
      },
    };
  };

  it("displays the stay interrupted button when the stay interrupted flag is not set", async () => {
    Auth.currentSession = jest.fn().mockResolvedValue(getMockSession("Normal"));

    const data = getData({ isAllowed: true, isActive: false });
    axios.get = jest.fn().mockReturnValueOnce({ data });

    act(() => {
      renderInProvider(<SummaryPage />);
    });

    await ensureLoadingIsComplete();

    expect(
      screen.getByRole("button", { name: "Stay interrupted" })
    ).toBeInTheDocument();
  });

  it("displays the re-request space button when the stay interrupted flag is set", async () => {
    Auth.currentSession = jest.fn().mockResolvedValue(getMockSession("Normal"));

    const data = getData({ isAllowed: true, isActive: true });
    axios.get = jest.fn().mockReturnValueOnce({ data });

    act(() => {
      renderInProvider(<SummaryPage />);
    });

    await ensureLoadingIsComplete();

    expect(
      screen.getByRole("button", { name: "Stay interrupted" })
    ).toBeInTheDocument();
  });

  it("does not display the stay interrupted or re-request space buttons when the is active flag is not set", async () => {
    Auth.currentSession = jest.fn().mockResolvedValue(getMockSession("Normal"));

    const data = getData({ isAllowed: false, isActive: false });
    axios.get = jest.fn().mockReturnValueOnce({ data });

    act(() => {
      renderInProvider(<SummaryPage />);
    });

    await ensureLoadingIsComplete();

    const stayInterruptedButton = screen.queryByRole("button", {
      name: "Stay interrupted",
    });
    const reRequestSpaceButton = screen.queryByRole("button", {
      name: "Re-request space",
    });

    expect(stayInterruptedButton).not.toBeInTheDocument();
    expect(reRequestSpaceButton).not.toBeInTheDocument();
  });
});
