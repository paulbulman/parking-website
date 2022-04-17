import { Auth } from "@aws-amplify/auth";
import { UsernamePasswordOpts } from "@aws-amplify/auth/lib-esm/types";
import { UserType } from "./auth.dev.types";

const fakeLocalStorageKey = "signedInUserType";

const fakeDelay = () => new Promise((resolve) => setTimeout(resolve, 500));

const getMockToken = (userType: UserType) => {
  switch (userType) {
    case "Normal":
      return (
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
        "eyJzdWIiOiIxMjM0NTY3ODkwIiwiZ2l2ZW5fbmFtZSI6IkpvaG4iLCJpYXQiOjE1MTYyMzkwMjIsImNvZ25pdG86dXNlcm5hbWUiOiJVc2VyMSJ9." +
        "En3Pd9nbOf_LWbFLgprT1ml7imh8Sb2N6j-EB-JJekA"
      );
    case "TeamLeader":
      return (
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
        "eyJzdWIiOiIxMjM0NTY3ODkwIiwiY29nbml0bzpncm91cHMiOlsiVGVhbUxlYWRlciJdLCJnaXZlbl9uYW1lIjoiSm9obiIsImlhdCI6MTUxNjIzOTAyMiwiY29nbml0bzp1c2VybmFtZSI6IlVzZXIxIn0." +
        "vRzKqpZ2FThjbClrZOfxPmlcenQcNtnEfNwBSaSNJb0"
      );
    case "UserAdmin":
      return (
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
        "eyJzdWIiOiIxMjM0NTY3ODkwIiwiY29nbml0bzpncm91cHMiOlsiVXNlckFkbWluIl0sImdpdmVuX25hbWUiOiJKb2huIiwiaWF0IjoxNTE2MjM5MDIyLCJjb2duaXRvOnVzZXJuYW1lIjoiVXNlcjEifQ." +
        "8x5J5jQLhwnBLhgprGSYex_QDknGyfHfjWrIrTDV2R8"
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
