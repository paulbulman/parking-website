import React, { useState } from "react";
import LoginForm from "./LoginForm";

const LoginFormController = ({ login }) => {
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

export default LoginFormController;
