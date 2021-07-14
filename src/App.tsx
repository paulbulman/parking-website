import { useAuthContext } from "./hooks/context/auth";
import { AuthenticationStatuses } from "./context/auth/types";
import { Loading } from "./components/Loading";
import { SignedOutHeader } from "./components/SignedOutHeader";
import { SignedOutRouter } from "./components/SignedOutRouter";
import { SignedInHeader } from "./components/SignedInHeader";
import { SignedInRouter } from "./components/SignedInRouter";

export const App = () => {
  const { authenticationStatus, getGroups, getFirstName, signOut } =
    useAuthContext();

  const handleSignout = async () => {
    await signOut();
  };

  switch (authenticationStatus) {
    case AuthenticationStatuses.Initialising:
      return <Loading />;
    case AuthenticationStatuses.NewPasswordRequired:
    case AuthenticationStatuses.NotSignedIn:
      return (
        <>
          <SignedOutHeader />
          <SignedOutRouter authenticationStatus={authenticationStatus} />
        </>
      );
    case AuthenticationStatuses.SignedIn:
      const groups = getGroups();
      const firstName = getFirstName();
      return (
        <>
          <SignedInHeader
            groups={groups}
            firstName={firstName}
            onSignout={handleSignout}
          />
          <SignedInRouter groups={groups} />
        </>
      );
  }
};
