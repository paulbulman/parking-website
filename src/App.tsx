import { useAuthContext } from "./hooks/context/auth";
import { AuthenticationStatuses } from "./context/auth/types";
import { Loading } from "./components/Loading";
import { SignedOutApp } from "./pages/SignedOutApp";
import { SignedInApp } from "./pages/SignedInApp";

export const App = () => {
  const { authenticationStatus } = useAuthContext();

  switch (authenticationStatus) {
    case AuthenticationStatuses.Initialising:
      return <Loading />;
    case AuthenticationStatuses.NotSignedIn:
      return <SignedOutApp />;
    case AuthenticationStatuses.SignedIn:
      return <SignedInApp />;
  }
};
