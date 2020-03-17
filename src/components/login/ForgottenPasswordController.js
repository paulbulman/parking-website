import React, { useState } from "react";
import ForgottenPassword from "./ForgottenPassword";
import ResetPassword from "./ResetPassword";
import PasswordResetComplete from "./PasswordResetComplete";

export default () => {
  const [resetPassword, setResetPassword] = useState(false);
  const [passwordResetComplete, setPasswordResetComplete] = useState(false);

  const [credentials, setCredentials] = useState({
    email: "",
    resetCode: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (k, v) => setCredentials({ ...credentials, [k]: v });

  const handleForgottenPassword = async () => {
    setResetPassword(true);
  };

  const handleEnterNewPassword = async () => {
    setErrorMessage("");

    if (credentials.newPassword !== credentials.confirmNewPassword) {
      setErrorMessage("New passwords do not match");
      return;
    }

    setPasswordResetComplete(true);
  };

  const handleContinue = () => {
    console.log("Logging in...");
  };

  return passwordResetComplete ? (
    <PasswordResetComplete onContinue={handleContinue} />
  ) : resetPassword ? (
    <ResetPassword
      resetCode={credentials.resetCode}
      newPassword={credentials.newPassword}
      confirmNewPassword={credentials.confirmNewPassword}
      errorMessage={errorMessage}
      onChange={handleChange}
      onReset={handleEnterNewPassword}
    />
  ) : (
    <ForgottenPassword
      email={credentials.email}
      errorMessage={errorMessage}
      onChange={handleChange}
      onSubmit={handleForgottenPassword}
    />
  );
};
