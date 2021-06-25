import { Switch, Route } from "react-router-dom";
import { AuthenticationStatuses } from "../../context/auth/types";
import { LoginPage } from "../../pages/Login";
import { ForceChangePasswordPage } from "../../pages/ForceChangePassword";
import { ForgotPasswordPage } from "../../pages/ForgotPassword";
import { SignedOutRouterProps } from "./types";

export const SignedOutRouter = ({
  authenticationStatus,
}: SignedOutRouterProps) => {
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
