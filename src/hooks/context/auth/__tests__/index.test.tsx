import { ReactNode } from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import Auth from "@aws-amplify/auth";
import { useAuthContext } from "..";
import { AuthContextProvider } from "../../../../context/auth";
import { AuthenticationStatuses } from "../../../../context/auth/types";

describe("useAuth", () => {
  const email = "__EMAIL__";
  const password = "__PASSWORD__";

  const mockUser = { getSignInUserSession: () => true };

  const wrapper = ({ children }: { children: ReactNode }) => {
    return <AuthContextProvider>{children}</AuthContextProvider>;
  };

  it("throws an error when used outside an auth context provider", () => {
    const { result } = renderHook(() => useAuthContext());

    expect(result.error).toEqual(
      Error("useAuthContext must be used within an AuthContextProvider.")
    );
  });

  it("initially sets the authentication status to initialising", async () => {
    Auth.currentAuthenticatedUser = jest.fn();

    const { result, waitForNextUpdate } = renderHook(() => useAuthContext(), {
      wrapper,
    });

    expect(result.current.authenticationStatus).toBe(
      AuthenticationStatuses.Initialising
    );

    await waitForNextUpdate();
  });

  it("sets the authentication status to not signed in when there is no previously signed-in user", async () => {
    Auth.currentAuthenticatedUser = jest.fn().mockResolvedValue(null);

    const { result, waitForNextUpdate } = renderHook(() => useAuthContext(), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(result.current.authenticationStatus).toBe(
      AuthenticationStatuses.NotSignedIn
    );
  });

  it("sets the authentication status to signed in when there is a previously signed-in user", async () => {
    Auth.currentAuthenticatedUser = jest.fn().mockResolvedValue(mockUser);

    const { result, waitForNextUpdate } = renderHook(() => useAuthContext(), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(result.current.authenticationStatus).toBe(
      AuthenticationStatuses.SignedIn
    );
  });

  it("calls Auth.signIn with the given values", async () => {
    Auth.currentAuthenticatedUser = jest.fn().mockResolvedValue(null);
    Auth.signIn = jest.fn();

    const { result } = renderHook(() => useAuthContext(), { wrapper });

    await act(async () => {
      await result.current.signIn({ email, password });
    });

    expect(Auth.signIn).toBeCalledWith(email, password);
  });

  it("sets the authentication status to not signed in when login fails", async () => {
    Auth.currentAuthenticatedUser = jest.fn().mockResolvedValue(null);
    Auth.signIn = jest.fn().mockResolvedValue(null);

    const { result } = renderHook(() => useAuthContext(), { wrapper });

    await act(async () => {
      await result.current.signIn({ email, password });
    });

    expect(result.current.authenticationStatus).toBe(
      AuthenticationStatuses.NotSignedIn
    );
  });

  it("sets the authentication status to signed in when login succeeds", async () => {
    Auth.currentAuthenticatedUser = jest.fn().mockResolvedValue(null);
    Auth.signIn = jest.fn().mockResolvedValue(mockUser);

    const { result } = renderHook(() => useAuthContext(), { wrapper });

    await act(async () => {
      await result.current.signIn({ email, password });
    });

    expect(result.current.authenticationStatus).toBe(
      AuthenticationStatuses.SignedIn
    );
  });

  it("sets the authentication status to not signed in on logout", async () => {
    Auth.currentAuthenticatedUser = jest.fn().mockResolvedValue(mockUser);

    const { result } = renderHook(() => useAuthContext(), { wrapper });

    await act(async () => {
      await result.current.signOut();
    });

    expect(result.current.authenticationStatus).toBe(
      AuthenticationStatuses.NotSignedIn
    );
  });
});
