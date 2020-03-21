import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ForgottenPassword from "./ForgottenPassword";
import ResetPassword from "./ResetPassword";
import PasswordResetComplete from "./PasswordResetComplete";
import {
  forgotPassword,
  forgotPasswordSubmit,
  login,
  LoginResult
} from "../../services/authenticationService";
import {
  markAsAuthenticated,
  markAsNotAuthenticated
} from "../../redux/actions/authenticationActions";

const CreateForgottenPasswordController = () => {
  const ForgottenPasswordController = ({ markAsAuthenticated }) => {
    const history = useHistory();

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
      setErrorMessage("");

      if (await forgotPassword(credentials.email)) {
        setResetPassword(true);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    };

    const handleEnterNewPassword = async () => {
      setErrorMessage("");

      if (credentials.newPassword !== credentials.confirmNewPassword) {
        setErrorMessage("New passwords do not match");
        return;
      }

      const result = await forgotPasswordSubmit(
        credentials.email,
        credentials.resetCode,
        credentials.newPassword
      );

      if (result) {
        setPasswordResetComplete(true);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    };

    const handleContinue = async () => {
      const result = await login(credentials.email, credentials.newPassword);
      if (result === LoginResult.Success) {
        markAsAuthenticated();
        history.push("/");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
        markAsNotAuthenticated();
      }
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

  return ForgottenPasswordController;
};

const mapDispatchToProps = { markAsAuthenticated, markAsNotAuthenticated };

export default connect(
  null,
  mapDispatchToProps
)(CreateForgottenPasswordController());
