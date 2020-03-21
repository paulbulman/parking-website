import * as localStorage from "./../localStorage";

export const configure = config => {};

const setUserIdToken = username => {
  const timestamp = new Date().toISOString();
  const dummyTokenString = `[Some JWT string for user ${username} at ${timestamp}]`;
  localStorage.setUserIdToken(dummyTokenString);
};

export const signIn = async (username, password) => {
  if (username && password) {
    if (password === "temp") {
      return {
        username: username,
        challengeName: "NEW_PASSWORD_REQUIRED"
      };
    } else {
      setUserIdToken(username);
      return { signInUserSession: {} };
    }
  }

  return null;
};

export const completeNewPassword = async (signInResult, newPassword) => {
  if (signInResult.username && newPassword) {
    setUserIdToken(signInResult.username);
    return { signInUserSession: {} };
  }

  return null;
};

export const forgotPassword = async username => {
  if (!username) {
    throw new Error("AuthError: Username cannot be empty");
  }

  return {
    CodeDeliveryDetails: {
      AttributeName: "email",
      DeliveryMedium: "EMAIL",
      Destination: username
    }
  };
};

export const forgotPasswordSubmit = async (
  username,
  resetCode,
  newPassword
) => {
  if (!username || !resetCode || !newPassword) {
    throw new Error("AuthError: Parameter cannot be empty");
  }

  if (resetCode !== "123456") {
    return Promise.reject({
      code: "CodeMismatchException",
      name: "CodeMismatchException",
      message: "Invalid verification code provided, please try again."
    });
  }

  if (newPassword.length < 6) {
    return Promise.reject({
      code: "InvalidParameterException",
      name: "InvalidParameterException",
      message:
        "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6"
    });
  }
};

export const signOut = async () => {
  localStorage.removeUserIdToken();
};

export const currentUser = async () => {
  const userIdJwtToken = localStorage.getUserIdToken();

  if (userIdJwtToken) {
    return { username: "USER_ID" };
  }

  throw new Error("No current user");
};

export const currentSession = async () => {
  const userIdToken = localStorage.getUserIdToken();

  return {
    idToken: {
      jwtToken: userIdToken
    }
  };
};

export const changePassword = async (oldPassword, newPassword) => {
  if (oldPassword && newPassword) {
    return true;
  }

  throw new Error("Something went wrong");
};
