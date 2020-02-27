import React from "react";
import { Switch, Route } from "react-router-dom";
import Summary from "./summary/Summary";
import EditRequests from "./editRequests/EditRequests";
import RegistrationNumbers from "./RegistrationNumbers";
import NotFound from "./NotFound";
import Reservations from "./reservations/Reservations";
import OverrideRequests from "./overrideRequests/OverrideRequests";

const Router = () => (
  <Switch>
    <Route exact path="/">
      <Summary />
    </Route>
    <Route path="/EditRequests">
      <EditRequests />
    </Route>
    <Route path="/RegistrationNumbers">
      <RegistrationNumbers />
    </Route>
    <Route path="/Reservations">
      <Reservations />
    </Route>
    <Route path="/OverrideRequests">
      <OverrideRequests />
    </Route>
    <Route path="*">
      <NotFound />
    </Route>
  </Switch>
);

export default Router;
