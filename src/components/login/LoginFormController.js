import React, { useState } from "react";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import CompleteSignupForm from "./CompleteSignupForm";
import { login, LoginResult } from "../../services/authenticationService";
import {
  markAsAuthenticated,
  markAsNotAuthenticated
} from "../../redux/actions/authenticationActions";

export const CreateLoginFormController = login => {
  const LoginFormController = ({
    markAsAuthenticated,
    markAsNotAuthenticated
  }) => {
    const [completeSignup, setCompleteSignup] = useState(false);

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [signupData, setSignupData] = useState({
      newPassword: "",
      confirmNewPassword: ""
    });

    const [credentialsErrorMessage, setCredentialsErrorMessage] = useState("");
    const [signupErrorMessage, setsignupErrorMessage] = useState("");

    const handleCredentialsChange = (k, v) =>
      setCredentials({ ...credentials, [k]: v });
    const handleSignupDataChange = (k, v) =>
      setSignupData({ ...signupData, [k]: v });

    const handleLogin = async () => {
      const result = await login(credentials.email, credentials.password);
      if (result === LoginResult.Success) {
        handleLoginSuccess();
      } else if (result === LoginResult.CompleteSignupRequired) {
        setCompleteSignup(true);
      } else {
        handleLoginFailure();
      }
    };

    const handleLoginSuccess = () => {
      markAsAuthenticated();
    };

    const handleLoginFailure = () => {
      markAsNotAuthenticated();
      setCredentialsErrorMessage("Invalid username or password");
      setCredentials({ ...credentials, password: "" });
    };

    const handleSignup = async () => {
      setsignupErrorMessage("");

      if (signupData.newPassword !== signupData.confirmNewPassword) {
        setsignupErrorMessage("New passwords do not match");
        return;
      }

      const result = await login(
        credentials.email,
        credentials.password,
        signupData.newPassword
      );

      if (result === LoginResult.Success) {
        handleSignupSuccess();
      } else {
        handleSignupFailure();
      }
    };

    const handleSignupSuccess = () => {
      markAsAuthenticated();
    };

    const handleSignupFailure = () => {
      markAsNotAuthenticated();
      setsignupErrorMessage("Something went wrong. Please try again.");
      setSignupData({ ...signupData, newPassword: "", confirmNewPassword: "" });
    };

    return completeSignup ? (
      <CompleteSignupForm
        newPassword={signupData.newPassword}
        confirmNewPassword={signupData.confirmNewPassword}
        errorMessage={signupErrorMessage}
        onChange={handleSignupDataChange}
        onSignup={handleSignup}
      />
    ) : (
      <LoginForm
        email={credentials.email}
        password={credentials.password}
        errorMessage={credentialsErrorMessage}
        onChange={handleCredentialsChange}
        onLogin={handleLogin}
      />
    );
  };

  return LoginFormController;
};

const mapDispatchToProps = { markAsAuthenticated, markAsNotAuthenticated };

export default connect(
  null,
  mapDispatchToProps
)(CreateLoginFormController(login));
