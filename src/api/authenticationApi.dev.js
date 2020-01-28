import * as localStorage from "./../localStorage";

export const configure = config => {};

export const signIn = async (username, password) => {
  const setUserIdToken = username => {
    const timestamp = new Date().toISOString();
    const dummyTokenString = `[Some JWT string for user ${username} at ${timestamp}]`;
    localStorage.setUserIdToken(dummyTokenString);
  };

  if (username && password) {
    setUserIdToken(username);
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
