import Auth from "@aws-amplify/auth";
import { UsernamePasswordOpts } from "@aws-amplify/auth/lib-esm/types";
import { UserType } from "./auth.dev.types";

const fakeLocalStorageKey = "signedInUserType";

const fakeDelay = () => new Promise((resolve) => setTimeout(resolve, 500));

const getMockToken = (userType: UserType) => {
  switch (userType) {
    case "Normal":
      return (
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
        "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJjb2duaXRvOnVzZXJuYW1lIjoiVXNlcjEifQ." +
        "zB45sGOz6fmJHpJBVtRZQDa1rZHMi-MpjAcOCvjkC5E"
      );
    case "TeamLeader":
      return (
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
        "eyJzdWIiOiIxMjM0NTY3ODkwIiwiY29nbml0bzpncm91cHMiOlsiVGVhbUxlYWRlciJdLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjIsImNvZ25pdG86dXNlcm5hbWUiOiJVc2VyMSJ9." +
        "VL5oFUXkXfpoJlZozpiNMXFAYAttq2iCYFaCqryOdzU"
      );
    case "UserAdmin":
      return (
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
        "eyJzdWIiOiIxMjM0NTY3ODkwIiwiY29nbml0bzpncm91cHMiOlsiVXNlckFkbWluIl0sIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMiwiY29nbml0bzp1c2VybmFtZSI6IlVzZXIxIn0." +
        "pTwF5BPkgUHfEhkhybB7GuCh_4aTfa3jeF0VbLq7gMM"
      );
  }
};

const getUserType = (
  username: string | UsernamePasswordOpts,
  password: string | undefined
): UserType | null => {
  if (username === "user@example" && password === "pass") {
    return "Normal";
  }
  if (username === "teamLeader@example" && password === "pass") {
    return "TeamLeader";
  }
  if (username === "userAdmin@example" && password === "pass") {
    return "UserAdmin";
  }

  return null;
};

const getPreviousUserType = (): UserType | null => {
  const userType = localStorage.getItem(fakeLocalStorageKey);
  switch (userType) {
    case "Normal":
      return "Normal";
    case "TeamLeader":
      return "TeamLeader";
    case "UserAdmin":
      return "UserAdmin";
    default:
      return null;
  }
};

export const getMockSession = (userType: UserType) => {
  const token = getMockToken(userType);
  return {
    getIdToken: () => {
      return {
        getJwtToken: () => {
          return token;
        },
      };
    },
  };
};

export const getMockUser = (userType: UserType) => {
  const mockSession = getMockSession(userType);
  return {
    getSignInUserSession: () => {
      return mockSession;
    },
  };
};

Auth.configure = () => {
  return {};
};

Auth.currentAuthenticatedUser = async () => {
  await fakeDelay();

  const userType = getPreviousUserType();
  return userType !== null
    ? getMockUser(userType)
    : Promise.reject("The user is not authenticated");
};

// @ts-ignore
Auth.currentSession = async () => {
  await fakeDelay();

  const userType = getPreviousUserType();
  return userType !== null
    ? getMockSession(userType)
    : Promise.reject("The user is not authenticated");
};

Auth.signIn = async (username, password) => {
  await fakeDelay();

  const userType = getUserType(username, password);

  if (userType !== null) {
    localStorage.setItem(fakeLocalStorageKey, userType.toString());
    return getMockUser(userType);
  }

  const error = {
    code: "NotAuthorizedException",
    message: "Incorrect username or password.",
    name: "NotAuthorizedException",
  };

  return Promise.reject(error);
};

Auth.signOut = async () => {
  localStorage.removeItem(fakeLocalStorageKey);
};
