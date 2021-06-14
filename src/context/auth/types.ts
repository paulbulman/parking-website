import type { CognitoUser } from "@aws-amplify/auth";
import type { JwtPayload } from "jwt-decode";

export type AuthUser = CognitoUser & {
  challengeName: string;
};

export type AuthContextProviderProps = { children: React.ReactNode };

export type GroupName = "TeamLeader" | "UserAdmin";

export enum AuthenticationStatuses {
  Initialising,
  SignedIn,
  NewPasswordRequired,
  NotSignedIn,
}

export type SignInParameters = {
  email: string;
  password: string;
};

export type CompleteNewPasswordParameters = {
  password: string;
};

export type CustomJwtPayload = JwtPayload & {
  "cognito:groups": string[] | undefined;
};

export interface AuthContextValues {
  authenticationStatus: AuthenticationStatuses;
  signIn: (parameters: SignInParameters) => Promise<boolean>;
  completeNewPassword: (
    parameters: CompleteNewPasswordParameters
  ) => Promise<boolean>;
  getToken: () => Promise<string>;
  getGroups: () => GroupName[];
  signOut: () => Promise<void>;
}
