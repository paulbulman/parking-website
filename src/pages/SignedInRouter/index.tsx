import { Switch, Route } from "react-router-dom";
import { OverviewPage } from "../Overview";
import { EditRequestsPage } from "../EditRequests";
import { EditReservationsPage } from "../EditReservations";
import { useAuthContext } from "../../hooks/context/auth";

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
    </Switch>
  );
};
