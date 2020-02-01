import React from "react";
import { connect } from "react-redux";
import { logout } from "../../services/authenticationService";
import { markAsNotAuthenticated } from "../../redux/actions/authenticationActions";

const Logout = ({ markAsNotAuthenticated }) => {
  const onLogout = async () => {
    await logout();
    markAsNotAuthenticated();
  };

  return (
    <button onClick={onLogout} className="nav-link btn btn-link text-dark">
      Logout
    </button>
  );
};

const mapDispatchToProps = { markAsNotAuthenticated };

export default connect(null, mapDispatchToProps)(Logout);
