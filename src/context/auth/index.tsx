import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import Auth, { CognitoUser } from "@aws-amplify/auth";
import {
  AuthContextValues,
  AuthContextProviderProps,
  AuthenticationStatuses,
  SignInParameters,
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

export const AuthContext = createContext<AuthContextValues | undefined>(
  undefined
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isInitialising, setIsInitialising] = useState(true);
  const [user, setUser] = useState<CognitoUser | null>(null);

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

  const signOut = useCallback(async () => {
    try {
      await Auth.signOut({ global: true });
      setUser(null);
    } catch {
      setUser(null);
    }
  }, [setUser]);

  const contextValue = useMemo(
    () => ({ authenticationStatus, signIn, signOut }),
    [authenticationStatus, signIn, signOut]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
