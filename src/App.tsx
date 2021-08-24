import { useAuthContext } from "./hooks/context/auth";
import { AuthenticationStatuses } from "./context/auth/types";
import { Loading } from "./components/Loading";
import { SignedOutHeader } from "./components/SignedOutHeader";
import { SignedOutRouter } from "./components/SignedOutRouter";
import { SignedInHeader } from "./components/SignedInHeader";
import { SignedInRouter } from "./components/SignedInRouter";
import { Footer } from "./components/Footer";

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
          <div className="app is-flex is-flex-direction-column">
            <div className="is-flex-grow-1 is-flex-shrink-1">
              <SignedInHeader
                groups={groups}
                firstName={firstName}
                onSignout={handleSignout}
              />
              <SignedInRouter groups={groups} />
            </div>
            <Footer />
          </div>
        </>
      );
  }
};
