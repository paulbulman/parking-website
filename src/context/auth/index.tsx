import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import Auth from "@aws-amplify/auth";
import jwt_decode from "jwt-decode";
import {
  AuthUser,
  AuthContextValues,
  AuthContextProviderProps,
  AuthenticationStatuses,
  SignInParameters,
  CompleteNewPasswordParameters,
  ForgotPasswordParameters,
  ForgotPasswordSubmitParameters,
  CustomJwtPayload,
  GroupName,
} from "./types";

if (process.env.NODE_ENV === "development") {
  require("./auth.dev");
}

Auth.configure({
  Auth: {
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID,
  },
});

export const AuthContext =
  createContext<AuthContextValues | undefined>(undefined);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isInitialising, setIsInitialising] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const loadPreviousUser = async () => {
      try {
        const result = await Auth.currentAuthenticatedUser();
        setUser(result);
      } catch (error) {
        console.log({ error });
      }
      setIsInitialising(false);
    };
    loadPreviousUser();
  }, []);

  const authenticationStatus: AuthenticationStatuses = isInitialising
    ? AuthenticationStatuses.Initialising
    : user?.getSignInUserSession()
    ? AuthenticationStatuses.SignedIn
    : user?.challengeName === "NEW_PASSWORD_REQUIRED"
    ? AuthenticationStatuses.NewPasswordRequired
    : AuthenticationStatuses.NotSignedIn;

  const signIn = useCallback(
    async ({ email, password }: SignInParameters) => {
      try {
        const result = await Auth.signIn(email, password);
        setUser(result);
        return true;
      } catch (error) {
        console.log({ error });
        setUser(null);
        return false;
      }
    },
    [setUser]
  );

  const completeNewPassword = useCallback(
    async ({ password }: CompleteNewPasswordParameters) => {
      try {
        const result = await Auth.completeNewPassword(user, password);
        setUser(null);
        setUser(result);
        return true;
      } catch (error) {
        console.log({ error });
        setUser(null);
        return false;
      }
    },
    [user, setUser]
  );

  const forgotPassword = useCallback(
    async ({ email }: ForgotPasswordParameters) => {
      try {
        await Auth.forgotPassword(email);
        return true;
      } catch (error) {
        console.log({ error });
        return false;
      }
    },
    []
  );

  const forgotPasswordSubmit = useCallback(
    async ({ email, code, password }: ForgotPasswordSubmitParameters) => {
      try {
        await Auth.forgotPasswordSubmit(email, code, password);
        return true;
      } catch (error) {
        console.log({ error });
        return false;
      }
    },
    []
  );

  const signOut = useCallback(async () => {
    try {
      await Auth.signOut({ global: true });
      setUser(null);
    } catch {
      setUser(null);
    }
  }, [setUser]);

  const getToken = useCallback(async () => {
    try {
      const result = await Auth.currentSession();
      return result.getIdToken().getJwtToken();
    } catch (error) {
      setUser(null);
      throw error;
    }
  }, [setUser]);

  const getGroups = useCallback(() => {
    try {
      const result = user?.getSignInUserSession()?.getIdToken().getJwtToken();
      if (!result) {
        throw new Error("No current token");
      }
      const decoded = jwt_decode<CustomJwtPayload>(result);

      const rawGroupNames = decoded["cognito:groups"] ?? [];
      const groupNames: GroupName[] = [];

      if (rawGroupNames.includes("TeamLeader")) {
        groupNames.push("TeamLeader");
      }
      if (rawGroupNames.includes("UserAdmin")) {
        groupNames.push("UserAdmin");
      }

      return groupNames;
    } catch (error) {
      setUser(null);
      throw error;
    }
  }, [user, setUser]);

  const contextValue = useMemo(
    () => ({
      authenticationStatus,
      signIn,
      completeNewPassword,
      forgotPassword,
      forgotPasswordSubmit,
      signOut,
      getToken,
      getGroups,
    }),
    [
      authenticationStatus,
      signIn,
      completeNewPassword,
      forgotPassword,
      forgotPasswordSubmit,
      signOut,
      getToken,
      getGroups,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
