import React from "react";
import LoginForm from "./components/login/LoginFormController";
import { login } from "./services/authenticationService";

function App() {
  return (
    <div className="container">
      <LoginForm login={login} />
    </div>
  );
}

export default App;
