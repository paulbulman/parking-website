import React, { useEffect } from "react";
import { connect } from "react-redux";
import { refreshAuthenticationStatus } from "./redux/actions/authenticationActions";
import * as authenticationStatusEnum from "./redux/reducers/authenticationStatus";
import Loading from "./components/Loading";
import HeaderWrapper from "./components/HeaderWrapper";
import BodyWrapper from "./components/BodyWrapper";

export const App = ({ authenticationStatus, refreshAuthenticationStatus }) => {
  useEffect(() => {
    refreshAuthenticationStatus();
  }, [refreshAuthenticationStatus]);

  if (authenticationStatus === authenticationStatusEnum.UNKNOWN) {
    return <Loading />
  }

  const isAuthenticated =
    authenticationStatus === authenticationStatusEnum.AUTHENTICATED;

  return (
    <>
      <HeaderWrapper isAuthenticated={isAuthenticated} />
      <BodyWrapper isAuthenticated={isAuthenticated} />
    </>
  );
};

const mapStateToProps = ({ authenticationStatus }) => ({
  authenticationStatus
});

const mapDispatchToProps = { refreshAuthenticationStatus };

export default connect(mapStateToProps, mapDispatchToProps)(App);
