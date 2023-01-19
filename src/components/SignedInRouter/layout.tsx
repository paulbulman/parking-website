import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../hooks/context/auth";
import { Footer } from "../Footer";
import { SignedInHeader } from "../SignedInHeader";

export const Layout = () => {
  const { getGroups, getFirstName, signOut } = useAuthContext();

  const groups = getGroups();
  const firstName = getFirstName();

  const handleSignout = async () => {
    await signOut();
  };

  return (
    <>
      <div className="app is-flex is-flex-direction-column">
        <div className="is-flex-grow-1 is-flex-shrink-1">
          <SignedInHeader
            groups={groups}
            firstName={firstName}
            onSignout={handleSignout}
          />
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};
