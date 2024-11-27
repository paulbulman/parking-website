import { BrowserRouter } from "react-router";
import { useAuthContext } from "./hooks/context/auth";
import { AuthenticationStatuses } from "./context/auth/types";
import { Loading } from "./components/Loading";
import { SignedOutHeader } from "./components/SignedOutHeader";
import { SignedOutRouter } from "./components/SignedOutRouter";
import { SignedInRouter } from "./components/SignedInRouter";

export const App = () => {
  const { authenticationStatus } = useAuthContext();

  switch (authenticationStatus) {
    case AuthenticationStatuses.Initialising:
      return <Loading />;
    case AuthenticationStatuses.NewPasswordRequired:
    case AuthenticationStatuses.NotSignedIn:
      return (
        <BrowserRouter>
          <SignedOutHeader />
          <SignedOutRouter authenticationStatus={authenticationStatus} />
        </BrowserRouter>
      );
    case AuthenticationStatuses.SignedIn:
      return <SignedInRouter />;
  }
};
