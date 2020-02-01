import React, { useState } from "react";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import { login } from "../../services/authenticationService";
import {
  markAsAuthenticated,
  markAsNotAuthenticated
} from "../../redux/actions/authenticationActions";

export const CreateLoginFormController = login => {
  const LoginFormController = ({
    markAsAuthenticated,
    markAsNotAuthenticated
  }) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (k, v) => setCredentials({ ...credentials, [k]: v });

    const handleLogin = async () => {
      if (await login(credentials.email, credentials.password)) {
        handleLoginSuccess();
      } else {
        handleLoginFailure();
      }
    };

    const handleLoginSuccess = () => {
      markAsAuthenticated();
    };

    const handleLoginFailure = () => {
      markAsNotAuthenticated();
      setErrorMessage("Invalid username or password");
      setCredentials({ ...credentials, password: "" });
    };

    return (
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
