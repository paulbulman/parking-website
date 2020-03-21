import React from "react";
import { Switch, Route } from "react-router-dom";
import ForgottenPassword from "../login/ForgottenPasswordController";
import LoginForm from "../login/LoginFormController";

const UnauthenticatedRouter = () => (
  <Switch>
    <Route exact path="/ForgottenPassword">
      <ForgottenPassword />
    </Route>
    <Route path="*">
      <LoginForm />
    </Route>
  </Switch>
);

export default UnauthenticatedRouter;
