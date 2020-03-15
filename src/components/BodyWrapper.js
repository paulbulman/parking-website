import React from "react";
import AuthenticatedRouter from "./router/AuthenticatedRouter";
import UnauthenticatedRouter from "./router/UnauthenticatedRouter";

const BodyWrapper = ({ isAuthenticated }) => {
  return (
    <div className="container">
      <main role="main" className="pb-3">
        {isAuthenticated ? <AuthenticatedRouter /> : <UnauthenticatedRouter />}
      </main>
    </div>
  );
};

export default BodyWrapper;
