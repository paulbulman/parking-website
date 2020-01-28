import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { login } from "../../services/authenticationService";

const CreateLoginFormController = login => {
  const LoginFormController = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (k, v) => setCredentials({ ...credentials, [k]: v });

    const handleLogin = () => {
      login(credentials.email, credentials.password);
      setCredentials({ ...credentials, password: "" });
      setErrorMessage("Not yet implemented");
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

export default CreateLoginFormController(login);
