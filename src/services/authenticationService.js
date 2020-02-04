import * as Auth from "../api/authenticationApi";
import * as dispatch from "./../redux/dispatchers/authenticationDispatchers";

export const createConfigure = configureApi => () =>
  configureApi({
    Auth: {
      region: "eu-west-2",
      userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
      userPoolWebClientId: process.env.REACT_APP_COGNITO_APP_CLIENT_ID
    }
  });

export const createLogin = (signIn, markAsAuthenticated) => async (
  username,
  password
) => {
  try {
    const signInResult = await signIn(username, password);

    if (signInResult.signInUserSession) {
      markAsAuthenticated();
      return true;
    }
  } catch {}

  return false;
};

export const createLogout = (signOut, markAsNotAuthenticated) => async () => {
  try {
    await signOut();
    markAsNotAuthenticated();
  } catch {}
};

export const createRefreshAuthenticationStatus = (
  currentUser,
  markAsAuthenticated,
  markAsNotAuthenticated
) => async () => {
  try {
    await currentUser();
    markAsAuthenticated();
  } catch {
    markAsNotAuthenticated();
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

export const login = createLogin(Auth.signIn, dispatch.markAsAuthenticated);

export const logout = createLogout(
  Auth.signOut,
  dispatch.markAsNotAuthenticated
);

export const refreshAuthenticationStatus = createRefreshAuthenticationStatus(
  Auth.currentUser,
  dispatch.markAsAuthenticated,
  dispatch.markAsNotAuthenticated
);

export const getUserIdToken = createGetUserIdToken(Auth.currentSession);
