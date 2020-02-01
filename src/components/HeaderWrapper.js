import React from "react";
import AuthenticatedHeader from "./header/AuthenticatedHeader";
import UnauthenticatedHeader from "./header/UnauthenticatedHeader";

const HeaderWrapper = ({ isAuthenticated }) => (
  <header>
    <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
      <div className="container">
        {isAuthenticated ? <AuthenticatedHeader /> : <UnauthenticatedHeader />}
      </div>
    </nav>
  </header>
);

export default HeaderWrapper;
