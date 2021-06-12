import { Switch, Route } from "react-router-dom";
import { OverviewPage } from "../Overview";
import { EditRequestsPage } from "../EditRequests";

export const SignedInRouter = () => {
  return (
    <Switch>
      <Route exact path="/">
        <OverviewPage />
      </Route>
      <Route path="/edit-requests">
        <EditRequestsPage />
      </Route>
    </Switch>
  );
};
