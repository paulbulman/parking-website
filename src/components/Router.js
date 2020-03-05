import React from "react";
import { Switch, Route } from "react-router-dom";
import Account from "./account/Account";
import EditRequests from "./editRequests/EditRequests";
import NotFound from "./NotFound";
import OverrideRequests from "./OverrideRequests";
import RegistrationNumbers from "./RegistrationNumbers";
import Reservations from "./reservations/Reservations";
import Summary from "./summary/Summary";

const Router = () => (
  <Switch>
    <Route exact path="/">
      <Summary />
    </Route>
    <Route path="/Account">
      <Account />
    </Route>
    <Route path="/EditRequests">
      <EditRequests />
    </Route>
    <Route path="/OverrideRequests">
      <OverrideRequests />
    </Route>
    <Route path="/RegistrationNumbers">
      <RegistrationNumbers />
    </Route>
    <Route path="/Reservations">
      <Reservations />
    </Route>
    <Route path="*">
      <NotFound />
    </Route>
  </Switch>
);

export default Router;
