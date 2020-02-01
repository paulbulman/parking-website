import React from "react";
import LoginFormController from "./LoginFormController";

// This exists as a simple way for the body wrapper tests to determine which
// child component has been rendered without needing to mock out redux etc.
const LoginFormWrapper = () => <LoginFormController />;

export default LoginFormWrapper;
