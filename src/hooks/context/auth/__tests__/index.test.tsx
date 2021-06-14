import { ReactNode } from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import Auth from "@aws-amplify/auth";
import { useAuthContext } from "..";
import { AuthContextProvider } from "../../../../context/auth";
import { getMockSession, getMockUser } from "../../../../context/auth/auth.dev";
import { AuthenticationStatuses } from "../../../../context/auth/types";

describe("useAuth", () => {
  const email = "__EMAIL__";
  const password = "__PASSWORD__";

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
    Auth.currentAuthenticatedUser = jest
      .fn()
      .mockResolvedValue(getMockUser("Normal"));

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

  it("calls Auth.completeNewPassword with the given values", async () => {
    const user = {
      getSignInUserSession: () => null,
      challengeName: "NEW_PASSWORD_REQUIRED",
    };

    Auth.currentAuthenticatedUser = jest.fn().mockResolvedValue(null);
    Auth.signIn = jest.fn().mockResolvedValue(user);
    Auth.completeNewPassword = jest
      .fn()
      .mockResolvedValue(getMockUser("Normal"));

    const { result } = renderHook(() => useAuthContext(), { wrapper });

    await act(async () => {
      await result.current.signIn({ email, password });
    });

    expect(result.current.authenticationStatus).toBe(
      AuthenticationStatuses.NewPasswordRequired
    );

    await act(async () => {
      await result.current.completeNewPassword({
        password: "__NEW_PASSWORD__",
      });
    });

    expect(Auth.completeNewPassword).toBeCalledWith(user, "__NEW_PASSWORD__");

    expect(result.current.authenticationStatus).toBe(
      AuthenticationStatuses.SignedIn
    );
  });

  it("sets the authentication status to not signed in when login fails", async () => {
    Auth.currentAuthenticatedUser = jest.fn().mockResolvedValue(null);
    Auth.signIn = jest.fn().mockResolvedValue(null);

    const { result, waitForNextUpdate } = renderHook(() => useAuthContext(), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(result.current.authenticationStatus).toBe(
      AuthenticationStatuses.NotSignedIn
    );

    await act(async () => {
      await result.current.signIn({ email, password });
    });

    expect(result.current.authenticationStatus).toBe(
      AuthenticationStatuses.NotSignedIn
    );
  });

  it("sets the authentication status to signed in when login succeeds", async () => {
    Auth.currentAuthenticatedUser = jest.fn().mockResolvedValue(null);
    Auth.signIn = jest.fn().mockResolvedValue(getMockUser("Normal"));

    const { result, waitForNextUpdate } = renderHook(() => useAuthContext(), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(result.current.authenticationStatus).toBe(
      AuthenticationStatuses.NotSignedIn
    );

    await act(async () => {
      await result.current.signIn({ email, password });
    });

    expect(result.current.authenticationStatus).toBe(
      AuthenticationStatuses.SignedIn
    );
  });

  it("sets the authentication status to not signed in on logout", async () => {
    Auth.currentAuthenticatedUser = jest
      .fn()
      .mockResolvedValue(getMockUser("Normal"));
    Auth.signOut = jest.fn();

    const { result, waitForNextUpdate } = renderHook(() => useAuthContext(), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(result.current.authenticationStatus).toBe(
      AuthenticationStatuses.SignedIn
    );

    await act(async () => {
      await result.current.signOut();
    });

    expect(result.current.authenticationStatus).toBe(
      AuthenticationStatuses.NotSignedIn
    );
  });

  it("returns the user ID token for the current user's session", async () => {
    Auth.currentAuthenticatedUser = jest
      .fn()
      .mockResolvedValue(getMockUser("Normal"));
    Auth.currentSession = jest.fn().mockResolvedValue(getMockSession("Normal"));

    const { result } = renderHook(() => useAuthContext(), {
      wrapper,
    });

    let token;
    await act(async () => {
      token = await result.current.getToken();
    });

    expect(token).not.toBeNull();
  });

  it("returns no groups for a normal user", async () => {
    Auth.currentAuthenticatedUser = jest
      .fn()
      .mockResolvedValue(getMockUser("Normal"));

    const { result, waitForNextUpdate } = renderHook(() => useAuthContext(), {
      wrapper,
    });

    await waitForNextUpdate();

    const groups = result.current.getGroups();
    expect(groups).toMatchObject([]);
  });

  it("returns team leader group for a team leader user", async () => {
    Auth.currentAuthenticatedUser = jest
      .fn()
      .mockResolvedValue(getMockUser("TeamLeader"));

    const { result, waitForNextUpdate } = renderHook(() => useAuthContext(), {
      wrapper,
    });

    await waitForNextUpdate();

    const groups = result.current.getGroups();
    expect(groups).toMatchObject(["TeamLeader"]);
  });

  it("returns user admin group for an admin user", async () => {
    Auth.currentAuthenticatedUser = jest
      .fn()
      .mockResolvedValue(getMockUser("UserAdmin"));

    const { result, waitForNextUpdate } = renderHook(() => useAuthContext(), {
      wrapper,
    });

    await waitForNextUpdate();

    const groups = result.current.getGroups();
    expect(groups).toMatchObject(["UserAdmin"]);
  });
});
