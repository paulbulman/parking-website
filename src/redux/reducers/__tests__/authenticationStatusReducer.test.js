import authenticationStatusReducer from "../authenticationStatusReducer";
import * as authenticationStatus from "../../reducers/authenticationStatus";
import * as authenticationActions from "../../actions/authenticationActions";

describe("authentication status reducer", () => {
  it("returns AUTHENTICATED when passed action type AUTHENTICATED", () => {
    const result = authenticationStatusReducer(
      "PREVIOUS_STATE",
      authenticationActions.createActionAuthenticated()
    );

    expect(result).toBe(authenticationStatus.AUTHENTICATED);
  });

  it("returns NOT_AUTHENTICATED when passed action type NOT_AUTHENTICATED", () => {
    const result = authenticationStatusReducer(
      "PREVIOUS_STATE",
      authenticationActions.createActionNotAuthenticated()
    );

    expect(result).toBe(authenticationStatus.NOT_AUTHENTICATED);
  });

  it("returns previous state when passed other action type", () => {
    const previousState = "PREVIOUS_STATE";
    const action = { type: "DUMMY" };

    const result = authenticationStatusReducer(previousState, action);

    expect(result).toBe("PREVIOUS_STATE");
  });
});
