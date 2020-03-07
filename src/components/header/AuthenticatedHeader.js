import React from "react";
import Logout from "./Logout";
import Home from "./Home";
import Link from "./Link";

const AuthenticatedHeader = () => (
  <>
    <Home />
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target=".navbar-collapse"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/Account/Profile" caption="Account" />
        </li>
        <li className="nav-item">
          <Logout />
        </li>
      </ul>
      <ul className="navbar-nav flex-grow-1">
        <li className="nav-item">
          <Link to="/EditRequests" caption="Edit Requests" />
        </li>
        <li className="nav-item">
          <Link to="/RegistrationNumbers" caption="Registration Numbers" />
        </li>
        <li className="nav-item">
          <Link to="/Reservations" caption="Reservations" />
        </li>
        <li className="nav-item">
          <Link to="/OverrideRequests" caption="Override Requests" />
        </li>
        <li className="nav-item">
          <Link to="/ManageUsers" caption="Manage Users" />
        </li>
      </ul>
    </div>
  </>
);

export default AuthenticatedHeader;
