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

    const [credentials, setCredentials] = useState({
      email: "",
      password: "",
      newPassword: "",
      confirmNewPassword: ""
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (k, v) => setCredentials({ ...credentials, [k]: v });

    const handleLogin = async () => {
      const result = await login(credentials.email, credentials.password);
      if (result === LoginResult.Success) {
        markAsAuthenticated();
      } else if (result === LoginResult.CompleteSignupRequired) {
        setCompleteSignup(true);
      } else {
        handleLoginFailure();
      }
    };

    const handleLoginFailure = () => {
      markAsNotAuthenticated();
      setErrorMessage("Invalid username or password");
      setCredentials({ ...credentials, password: "" });
    };

    const handleSignup = async () => {
      setErrorMessage("");

      if (credentials.newPassword !== credentials.confirmNewPassword) {
        setErrorMessage("New passwords do not match");
        return;
      }

      const result = await login(
        credentials.email,
        credentials.password,
        credentials.newPassword
      );

      if (result === LoginResult.Success) {
        markAsAuthenticated();
      } else {
        handleSignupFailure();
      }
    };

    const handleSignupFailure = () => {
      markAsNotAuthenticated();
      setErrorMessage("Something went wrong. Please try again.");
      setCredentials({
        ...credentials,
        newPassword: "",
        confirmNewPassword: ""
      });
    };

    return completeSignup ? (
      <CompleteSignupForm
        newPassword={credentials.newPassword}
        confirmNewPassword={credentials.confirmNewPassword}
        errorMessage={errorMessage}
        onChange={handleChange}
        onSignup={handleSignup}
      />
    ) : (
      <LoginForm
        email={credentials.email}
        password={credentials.password}
        errorMessage={errorMessage}
        onChange={handleChange}
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
