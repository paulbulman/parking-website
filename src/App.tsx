import { useAuthContext } from "./hooks/context/auth";
import { AuthenticationStatuses } from "./context/auth/types";
import { SignedInApp } from "./pages/SignedInApp";
import { SignedOutApp } from "./pages/SignedOutApp";

export const App = () => {
  const { authenticationStatus } = useAuthContext();

  switch (authenticationStatus) {
    case AuthenticationStatuses.Initialising:
      return <div>Loading...</div>;
    case AuthenticationStatuses.NotSignedIn:
      return <SignedOutApp />;
    case AuthenticationStatuses.SignedIn:
      return <SignedInApp />;
  }
};
