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

  return (
    <Switch>
      <Route exact path="/">
        <OverviewPage />
      </Route>
      <Route path="/edit-requests">
        <EditRequestsPage />
      </Route>
      {groups.includes("TeamLeader") && (
        <Route path="/edit-reservations">
          <EditReservationsPage />
        </Route>
      )}
      {groups.includes("UserAdmin") && (
        <>
          <Route exact path="/users">
            <UsersPage />
          </Route>
          <Route exact path="/users/add">
            <AddUserPage />
          </Route>
        </>
      )}
    </Switch>
  );
};
