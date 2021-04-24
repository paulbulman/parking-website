export type AuthContextProviderProps = { children: React.ReactNode };

export enum AuthenticationStatuses {
  Initialising,
  SignedIn,
  NotSignedIn,
}

export type SignInParameters = {
  email: string;
  password: string;
};

export interface AuthContextValues {
  authenticationStatus: AuthenticationStatuses;
  signIn: (parameters: SignInParameters) => Promise<boolean>;
  signOut: () => Promise<void>;
}
