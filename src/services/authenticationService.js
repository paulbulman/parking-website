import * as Auth from "../api/authenticationApi";

export const createConfigure = configureApi => () =>
  configureApi({
    Auth: {
      region: "eu-west-2",
      userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
      userPoolWebClientId: process.env.REACT_APP_COGNITO_APP_CLIENT_ID
    }
  });

export const createLogin = signIn => async (username, password) => {
  try {
    const signInResult = await signIn(username, password);

    if (signInResult.signInUserSession) {
      return true;
    }
  } catch (error) {}

  return false;
};

export const createLogout = signOut => async () => {
  try {
    await signOut();
  } catch (error) {}
};

export const createIsAuthenticated = currentUser => async () => {
  try {
    await currentUser();
    return true;
  } catch {
    return false;
  }
};

export const createGetUserIdToken = currentSession => async () => {
  try {
    const currentSessionResult = await currentSession();
    return currentSessionResult.idToken.jwtToken;
  } catch {
    return null;
  }
};

export const configure = createConfigure(Auth.configure);

export const login = createLogin(Auth.signIn);

export const logout = createLogout(Auth.signOut);

export const isAuthenticated = createIsAuthenticated(Auth.currentUser);

export const getUserIdToken = createGetUserIdToken(Auth.currentSession);
