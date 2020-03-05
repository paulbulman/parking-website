import React from "react";
import { NavLink } from "react-router-dom";

export default () => (
  <ul className="nav nav-pills flex-column">
    <li className="nav-item">
      <NavLink
        to="/Account/Profile"
        className="nav-link"
        activeClassName="active"
      >
        Profile
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink
        to="/Account/Password"
        className="nav-link"
        activeClassName="active"
      >
        Password
      </NavLink>
    </li>
  </ul>
);
