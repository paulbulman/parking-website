import React from "react";
import { Switch, Route } from "react-router-dom";
import Summary from "./summary/Summary";
import Account from "./account/Account";
import EditRequests from "./editRequests/EditRequests";
import ManageUsers from "./manageUsers/ManageUsers";
import AddUser from "./manageUsers/AddUser";
import EditUser from "./manageUsers/EditUserController";
import DeleteUser from "./manageUsers/DeleteUser";
import OverrideRequests from "./OverrideRequests";
import RegistrationNumbers from "./RegistrationNumbers";
import Reservations from "./reservations/Reservations";
import NotFound from "./NotFound";

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
    <Route exact path="/ManageUsers">
      <ManageUsers />
    </Route>
    <Route path="/ManageUsers/Add">
      <AddUser />
    </Route>
    <Route path="/ManageUsers/Edit/:userId">
      <EditUser />
    </Route>
    <Route path="/ManageUsers/Delete/:userId">
      <DeleteUser />
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
