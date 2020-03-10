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

export const signOut = async () => {
  localStorage.removeUserIdToken();
};

export const currentUser = async () => {
  const userIdJwtToken = localStorage.getUserIdToken();

  if (userIdJwtToken) {
    return { user: {} };
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
