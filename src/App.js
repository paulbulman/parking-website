import React, { useEffect } from "react";
import { connect } from "react-redux";
import { refreshAuthenticationStatus } from "./services/authenticationService";
import * as authenticationStatusEnum from "./redux/reducers/authenticationStatus";
import Loading from "./components/Loading";
import HeaderWrapper from "./components/HeaderWrapper";
import BodyWrapper from "./components/BodyWrapper";

export const CreateApp = refreshAuthenticationStatus => {
  const App = ({ authenticationStatus }) => {
    useEffect(() => {
      refreshAuthenticationStatus();
    }, []);

    if (authenticationStatus === authenticationStatusEnum.UNKNOWN) {
      return <Loading />;
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

  return App;
};

const mapStateToProps = ({ authenticationStatus }) => ({
  authenticationStatus
});

export default connect(mapStateToProps)(CreateApp(refreshAuthenticationStatus));
