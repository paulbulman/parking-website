import { Switch, Route } from "react-router-dom";
import { useAuthContext } from "../../hooks/context/auth";
import { OverviewPage } from "../Overview";
import { EditRequestsPage } from "../EditRequests";
import { EditReservationsPage } from "../EditReservations";
import { UsersPage } from "../Users";
import { AddUserPage } from "../AddUser";

export const SignedInRouter = () => {
  const { getGroups } = useAuthContext();
  const groups = getGroups();

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
      <Route exact path="/users/add">
        {AddUser}
      </Route>
    </Switch>
  );
};
