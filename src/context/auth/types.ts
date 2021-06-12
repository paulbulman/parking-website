import type { JwtPayload } from "jwt-decode";

export type AuthContextProviderProps = { children: React.ReactNode };

export type GroupName = "TeamLeader" | "UserAdmin";

export enum AuthenticationStatuses {
  Initialising,
  SignedIn,
  NotSignedIn,
}

export type SignInParameters = {
  email: string;
  password: string;
};

export type CustomJwtPayload = JwtPayload & {
  "cognito:groups": string[] | undefined;
};

export interface AuthContextValues {
  authenticationStatus: AuthenticationStatuses;
  signIn: (parameters: SignInParameters) => Promise<boolean>;
  getToken: () => Promise<string>;
  getGroups: () => GroupName[];
  signOut: () => Promise<void>;
}
