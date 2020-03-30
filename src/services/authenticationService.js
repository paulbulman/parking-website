import * as Auth from "../api/authenticationApi";
import jwt from "jsonwebtoken";

export const LoginResult = {
  Success: "SUCCESS",
  Failure: "FAILURE",
  CompleteSignupRequired: "COMPLETESIGNUPREQUIRED"
};

export const createConfigure = configureApi => () =>
  configureApi({
    Auth: {
      region: "eu-west-2",
      userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
      userPoolWebClientId: process.env.REACT_APP_COGNITO_APP_CLIENT_ID
    }
  });

export const createLogin = (signIn, completeNewPassword) => async (
  username,
  password,
  newPassword
) => {
  try {
    const signInResult = await signIn(username, password);

    if (signInResult.signInUserSession) {
      return LoginResult.Success;
    } else if (signInResult.challengeName === "NEW_PASSWORD_REQUIRED")
      if (newPassword) {
        const completeSignupResult = await completeNewPassword(
          signInResult,
          newPassword
        );

        if (completeSignupResult.signInUserSession) {
          return LoginResult.Success;
        }
      } else {
        return LoginResult.CompleteSignupRequired;
      }
  } catch {}

  return LoginResult.Failure;
};

export const createForgotPassword = forgotPassword => async username => {
  try {
    await forgotPassword(username);
    return true;
  } catch {
    return false;
  }
};

export const createForgotPasswordSubmit = forgotPasswordSubmit => async (
  username,
  resetCode,
  newPassword
) => {
  try {
    await forgotPasswordSubmit(username, resetCode, newPassword);
    return true;
  } catch {
    return false;
  }
};

export const createLogout = signOut => async () => {
  try {
    await signOut();
  } catch {}
};

export const createIsAuthenticated = currentUser => async () => {
  try {
    await currentUser();
    return true;
  } catch {
    return false;
  }
};

export const createGetCurrentUserId = currentUser => async () => {
  try {
    const result = await currentUser();
    return result.username;
  } catch {
    return null;
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

export const createChangePassword = changePassword => async (
  oldPassword,
  newPassword
) => {
  try {
    await changePassword(oldPassword, newPassword);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createHasRole = getUserIdToken => async role => {
  try {
    const raw = await getUserIdToken();
    const decoded = jwt.decode(raw);
    return (
      decoded["cognito:groups"] && decoded["cognito:groups"].includes(role)
    );
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const configure = createConfigure(Auth.configure);

export const login = createLogin(Auth.signIn, Auth.completeNewPassword);

export const forgotPassword = createForgotPassword(Auth.forgotPassword);

export const forgotPasswordSubmit = createForgotPasswordSubmit(
  Auth.forgotPasswordSubmit
);

export const logout = createLogout(Auth.signOut);

export const isAuthenticated = createIsAuthenticated(Auth.currentUser);

export const getCurrentUserId = createGetCurrentUserId(Auth.currentUser);

export const getUserIdToken = createGetUserIdToken(Auth.currentSession);

export const changePassword = createChangePassword(Auth.changePassword);

export const hasRole = createHasRole(getUserIdToken);
