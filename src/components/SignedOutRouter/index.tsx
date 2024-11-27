import { Routes, Route } from "react-router";
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
    <Routes>
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="*" element={getDefaultPage()} />
    </Routes>
  );
};
