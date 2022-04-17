import axios from "axios";
import { Auth } from "@aws-amplify/auth";
import { screen } from "@testing-library/react";
import { getMockSession } from "../../../context/auth/auth.dev";
import { UsersPage } from "..";
import {
  ensureLoadingIsComplete,
  renderInProvider,
} from "../../../testHelpers";

describe("Users", () => {
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

    renderInProvider(<UsersPage />);

    await ensureLoadingIsComplete();

    const [, dataRow] = screen.getAllByRole("row");

    expect(dataRow).toHaveTextContent("JohnDoe");
  });
});
