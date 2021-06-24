import { useAuthContext } from "./hooks/context/auth";
import { AuthenticationStatuses } from "./context/auth/types";
import { Loading } from "./components/Loading";
import { SignedOutHeader } from "./pages/SignedOutHeader";
import { SignedOutRouter } from "./pages/SignedOutRouter";
import { SignedInHeader } from "./pages/SignedInHeader";
import { SignedInRouter } from "./pages/SignedInRouter";

export const App = () => {
  const { authenticationStatus } = useAuthContext();

  switch (authenticationStatus) {
    case AuthenticationStatuses.Initialising:
      return <Loading />;
    case AuthenticationStatuses.NewPasswordRequired:
    case AuthenticationStatuses.NotSignedIn:
      return (
        <>
          <SignedOutHeader />
          <SignedOutRouter />
        </>
      );
    case AuthenticationStatuses.SignedIn:
      return (
        <>
          <SignedInHeader />
          <SignedInRouter />
        </>
      );
  }
};
