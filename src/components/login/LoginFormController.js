import React, { useState } from "react";
import LoginForm from "./LoginForm";

const LoginFormController = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (k, v) => setCredentials({ ...credentials, [k]: v });

  const handleLogin = () => {
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
