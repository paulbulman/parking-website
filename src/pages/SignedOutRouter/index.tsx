import { Switch, Route } from "react-router-dom";
import { useAuthContext } from "../../hooks/context/auth";
import { AuthenticationStatuses } from "../../context/auth/types";
import { LoginPage } from "../Login";
import { ForceChangePasswordPage } from "../ForceChangePassword";
import { ForgotPasswordPage } from "../ForgotPassword";

export const SignedOutRouter = () => {
  const { authenticationStatus } = useAuthContext();

  const getDefaultPage = () => {
    switch (authenticationStatus) {
      case AuthenticationStatuses.NotSignedIn:
        return <LoginPage />;
      case AuthenticationStatuses.NewPasswordRequired:
        return <ForceChangePasswordPage />;
      default:
        return null;
    }
  };

  return (
    <Switch>
      <Route exact path="/forgot-password">
        <ForgotPasswordPage />
      </Route>
      <Route>{getDefaultPage()}</Route>
    </Switch>
  );
};
