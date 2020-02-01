import { createRootReducer } from "../rootReducer";

describe("root reducer", () => {
  it("handles state.authenticationStatus with the authentication status reducer ", () => {
    const authenticationStatusReducer = jest.fn((s, a) => "UPDATED");

    const rootReducer = createRootReducer(authenticationStatusReducer);
    authenticationStatusReducer.mockClear();

    const action = { type: "TYPE" };
    const result = rootReducer({ authenticationStatus: "PREVIOUS" }, action);

    expect(result.authenticationStatus).toBe("UPDATED");

    expect(authenticationStatusReducer.mock.calls.length).toBe(1);
    expect(authenticationStatusReducer.mock.calls[0][0]).toBe("PREVIOUS");
    expect(authenticationStatusReducer.mock.calls[0][1]).toBe(action);
  });
});
