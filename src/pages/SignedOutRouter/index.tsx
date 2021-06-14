import { useAuthContext } from "../../hooks/context/auth";
import { AuthenticationStatuses } from "../../context/auth/types";
import { LoginPage } from "../Login";
import { ForceChangePasswordPage } from "../ForceChangePassword";

export const SignedOutRouter = () => {
  const { authenticationStatus } = useAuthContext();

  switch (authenticationStatus) {
    case AuthenticationStatuses.NotSignedIn:
      return <LoginPage />;
    case AuthenticationStatuses.NewPasswordRequired:
      return <ForceChangePasswordPage />;
    default:
      return null;
  }
};
