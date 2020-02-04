import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { login } from "../../services/authenticationService";

export const CreateLoginFormController = login => {
  const LoginFormController = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (k, v) => setCredentials({ ...credentials, [k]: v });

    const handleLogin = async () => {
      const result = await login(credentials.email, credentials.password);
      if (!result) {
        setErrorMessage("Invalid username or password");
        setCredentials({ ...credentials, password: "" });
      }
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
