import React from "react";
import LoginForm from "./login/LoginFormController";
import Router from "./Router";

const BodyWrapper = ({ isAuthenticated }) => {
  return (
    <div className="container">
      <main role="main" className="pb-3">
        {isAuthenticated ? <Router /> : <LoginForm />}
      </main>
    </div>
  );
};

export default BodyWrapper;
