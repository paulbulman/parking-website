import React from "react";
import { Switch, Route } from "react-router-dom";
import NotFound from "../NotFound";
import Profile from "./ProfileController";
import Password from "./PasswordController";

const Router = () => (
  <Switch>
    <Route path="/Account/Profile">
      <Profile />
    </Route>
    <Route path="/Account/Password">
      <Password />
    </Route>
    <Route path="*">
      <NotFound />
    </Route>
  </Switch>
);

export default Router;
