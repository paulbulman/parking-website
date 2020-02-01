import React from "react";
import Logout from "./Logout";
import Home from "./Home";

const AuthenticatedHeader = () => (
  <>
    <Home />
    <div className="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Logout />
        </li>
      </ul>
      <ul className="navbar-nav flex-grow-1">
          <li className="nav-item">
              More links here
          </li>
      </ul>
    </div>
  </>
);

export default AuthenticatedHeader;
