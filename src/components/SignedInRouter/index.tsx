import { Switch, Route } from "react-router-dom";
import { OverviewPage } from "../../pages/Overview";
import { EditRequestsPage } from "../../pages/EditRequests";
import { EditReservationsPage } from "../../pages/EditReservations";
import { UsersPage } from "../../pages/Users";
import { AddUserPage } from "../../pages/AddUser";
import { EditUserPage } from "../../pages/EditUser";
import { EditProfilePage } from "../../pages/EditProfile";
import { RegistrationNumbersPage } from "../../pages/RegistrationNumbers";
import { SignedInRouterProps } from "./types";

export const SignedInRouter = ({ groups }: SignedInRouterProps) => {
  const EditReservations = groups.includes("TeamLeader") ? (
    <EditReservationsPage />
  ) : (
    <div>Not allowed.</div>
  );

  const Users = groups.includes("UserAdmin") ? (
    <UsersPage />
  ) : (
    <div>Not allowed.</div>
  );

  const AddUser = groups.includes("UserAdmin") ? (
    <AddUserPage />
  ) : (
    <div>Not allowed.</div>
  );

  const EditUser = groups.includes("UserAdmin") ? (
    <EditUserPage />
  ) : (
    <div>Not allowed.</div>
  );

  return (
    <Switch>
      <Route exact path="/">
        <OverviewPage />
      </Route>
      <Route path="/edit-requests">
        <EditRequestsPage />
      </Route>
      <Route path="/edit-reservations">{EditReservations}</Route>
      <Route exact path="/users">
        {Users}
      </Route>
      <Route path="/profile">
        <EditProfilePage />
      </Route>
      <Route path="/registration-numbers">
        <RegistrationNumbersPage />
      </Route>
      <Route path="/users/add">{AddUser}</Route>
      <Route path="/users/edit/:userId">{EditUser}</Route>
    </Switch>
  );
};
