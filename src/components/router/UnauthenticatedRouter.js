import React from "react";
import { Switch, Route } from "react-router-dom";
import ForgottenPassword from "../login/ForgottenPassword";
import LoginForm from "../login/LoginFormController";

export default () => (
  <Switch>
    <Route exact path="/ForgottenPassword">
      <ForgottenPassword />
    </Route>
    <Route path="*">
      <LoginForm />
    </Route>
  </Switch>
);
