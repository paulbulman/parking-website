import { render, screen } from "@testing-library/react";
import { DailyDetails } from "..";

describe("Daily deatils", () => {
  interface getDataParameters {
    isAllowed: boolean;
    isSet: boolean;
  }
  const getData = ({ isAllowed, isSet }: getDataParameters) => {
    return {
      allocatedUsers: [
        {
          name: "__USER__",
          isHighlighted: false,
        },
      ],
      interruptedUsers: [],
      pendingUsers: [],
      stayInterruptedStatus: {
        isAllowed,
        isSet,
      },
    };
  };

  const reRequestSpaceButtonText = "Re-request space";
  const stayInterruptedButtonText = "Stay interrupted";

  it("displays the stay interrupted button when the stay interrupted flag is not set", () => {
    const details = getData({ isAllowed: true, isSet: false });
    render(
      <DailyDetails
        details={details}
        isSaving={false}
        updateStayInterruptedStatus={jest.fn()}
      />
    );

    expect(
      screen.getByRole("button", { name: stayInterruptedButtonText })
    ).toBeInTheDocument();
  });

  it("displays the re-request button when the stay interrupted flag is set", () => {
    const details = getData({ isAllowed: true, isSet: true });
    render(
      <DailyDetails
        details={details}
        isSaving={false}
        updateStayInterruptedStatus={jest.fn()}
      />
    );

    expect(
      screen.getByRole("button", { name: reRequestSpaceButtonText })
    ).toBeInTheDocument();
  });

  it("does not display the stay interrupted or re-request space buttons when the is allowed flag is not set", () => {
    const details = getData({ isAllowed: false, isSet: false });
    render(
      <DailyDetails
        details={details}
        isSaving={false}
        updateStayInterruptedStatus={jest.fn()}
      />
    );

    expect(
      screen.queryByRole("button", { name: stayInterruptedButtonText })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: reRequestSpaceButtonText })
    ).not.toBeInTheDocument();
  });
});
