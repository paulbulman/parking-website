import * as authenticationService from "../authenticationService";

describe("authentication service", () => {
  describe("when logging in", () => {
    it("calls the sign in API with the given credentials", async () => {
      const signInResult = { signInUserSession: {} };
      const signIn = jest.fn().mockResolvedValue(signInResult);
      const login = authenticationService.createLogin(signIn);

      await login("USER", "PASS");

      expect(signIn.mock.calls.length).toBe(1);
      expect(signIn.mock.calls[0][0]).toBe("USER");
      expect(signIn.mock.calls[0][1]).toBe("PASS");
    });
  });

  describe("when the sign in API returns a valid session", () => {
    it("returns true", async () => {
      const signInResult = { signInUserSession: {} };
      const signIn = async (username, password) => signInResult;
      const login = authenticationService.createLogin(signIn);

      const result = await login("USER", "PASS");

      expect(result).toBe(true);
    });
  });

  describe("when the sign in API returns an error", () => {
    it("returns false", async () => {
      const signIn = async (username, password) => {
        throw new Error("Something went wrong");
      };
      const login = authenticationService.createLogin(signIn);

      const result = await login("USER", "PASS");

      expect(result).toBe(false);
    });
  });

  describe("when logging out", () => {
    it("calls the sign out API", async () => {
      const signOut = jest.fn();
      const logout = authenticationService.createLogout(signOut);

      await logout();

      expect(signOut.mock.calls.length).toBe(1);
    });
  });

  describe("when determining whether there is a current authenticated user", () => {
    it("calls the current user API", async () => {
      const currentUser = jest.fn();
      const isAuthenticated = authenticationService.createIsAuthenticated(
        currentUser
      );

      const result = await isAuthenticated();

      expect(result).toBe(true);
      expect(currentUser.mock.calls.length).toBe(1);
    });
  });

  describe("when the current user API throws an error", () => {
    it("returns false", async () => {
      const currentUser = async () => {
        throw new Error("Something went wrong");
      };
      const isAuthenticated = authenticationService.createIsAuthenticated(
        currentUser
      );

      const result = await isAuthenticated();

      expect(result).toBe(false);
    });
  });

  describe("when fetching the current user ID token", () => {
    it("calls the current session API", async () => {
      const currentSessionResult = { idToken: { jwtToken: "TOKEN" } };
      const currentSession = async () => currentSessionResult;
      const getUserIdJwtToken = authenticationService.createGetUserIdToken(
        currentSession
      );

      const result = await getUserIdJwtToken();

      expect(result).toBe("TOKEN");
    });
  });

  describe("when the current session API throws an error", () => {
    it("returns null", async () => {
      const currentSessionFunc = async () => {
        throw new Error("Something went wrong");
      };
      const getUserIdJwtToken = authenticationService.createGetUserIdToken(
        currentSessionFunc
      );

      const result = await getUserIdJwtToken();

      expect(result).toBe(null);
    });
  });
});
