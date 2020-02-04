import React from "react";
import { logout } from "../../services/authenticationService";

const Logout = () => {
  const onLogout = async () => {
    await logout();
  };

  return (
    <button onClick={onLogout} className="nav-link btn btn-link text-dark">
      Logout
    </button>
  );
};

export default Logout;
