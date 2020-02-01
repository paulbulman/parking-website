import * as authenticationActions from "../authenticationActions";
import * as actionTypes from "../actionTypes";

describe("user authentication actions", () => {
  const checkDispatchedActionType = async (thunk, expectedActionType) => {
    const dispatch = jest.fn();
    await thunk(dispatch);

    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0].type).toEqual(expectedActionType);
  };

  describe("mark as authenticated", () => {
    it("dispatches AUTHENTICATED", async () => {
      await checkDispatchedActionType(
        authenticationActions.markAsAuthenticated(),
        actionTypes.AUTHENTICATED
      );
    });
  });

  describe("mark as not authenticated", () => {
    it("dispatches NOT_AUTHENTICATED", async () => {
      await checkDispatchedActionType(
        authenticationActions.markAsNotAuthenticated(),
        actionTypes.NOT_AUTHENTICATED
      );
    });
  });

  describe("refresh authentication status", () => {
    const checkRefreshAuthenticationStatus = async (
      isAuthenticatedResult,
      expectedActionType
    ) => {
      const refreshAuthenticationStatus = authenticationActions.createRefreshAuthenticationStatus(
        async () => isAuthenticatedResult
      );

      await checkDispatchedActionType(
        refreshAuthenticationStatus(),
        expectedActionType
      );
    };

    it("dispatches AUTHENTICATED when user was previously authenticated", async () => {
      await checkRefreshAuthenticationStatus(true, actionTypes.AUTHENTICATED);
    });

    it("dispatches NOT_AUTHENTICATED when user was not previously authenticated", async () => {
      await checkRefreshAuthenticationStatus(
        false,
        actionTypes.NOT_AUTHENTICATED
      );
    });
  });
});
