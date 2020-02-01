import React, { useEffect } from "react";
import { connect } from "react-redux";
import LoginForm from "./components/login/LoginFormController";
import { refreshAuthenticationStatus } from "./redux/actions/authenticationActions";
import * as authenticationStatusEnum from "./redux/reducers/authenticationStatus";

const App = ({ authenticationStatus, refreshAuthenticationStatus }) => {
  useEffect(() => {
    if (authenticationStatus === authenticationStatusEnum.UNKNOWN) {
      refreshAuthenticationStatus();
    }
  }, [authenticationStatus, refreshAuthenticationStatus]);

  const getContent = () => {
    switch (authenticationStatus) {
      case authenticationStatusEnum.UNKNOWN:
        return <div>Loading...</div>;
      case authenticationStatusEnum.NOT_AUTHENTICATED:
        return <LoginForm />;
      case authenticationStatusEnum.AUTHENTICATED:
        return <div>Logged in.</div>;
      default:
        return <div>Could not determine authentication status.</div>;
    }
  };

  return <div className="container">{getContent()}</div>;
};

const mapStateToProps = ({ authenticationStatus }) => ({
  authenticationStatus
});

const mapDispatchToProps = { refreshAuthenticationStatus };

export default connect(mapStateToProps, mapDispatchToProps)(App);
