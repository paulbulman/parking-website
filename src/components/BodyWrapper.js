import React from "react";
import LoginForm from "./login/LoginFormWrapper";
import AuthenticatedRouter from "./router/AuthenticatedRouter";

const BodyWrapper = ({ isAuthenticated }) => {
  return (
    <div className="container">
      <main role="main" className="pb-3">
        {isAuthenticated ? <AuthenticatedRouter /> : <LoginForm />}
      </main>
    </div>
  );
};

export default BodyWrapper;
