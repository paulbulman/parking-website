import { Switch, Route } from "react-router-dom";
import { AddUserPage } from "../../pages/AddUser";
import { DailyDetailsPage } from "../../pages/DailyDetails";
import { EditProfilePage } from "../../pages/EditProfile";
import { EditRequestsPage } from "../../pages/EditRequests";
import { EditReservationsPage } from "../../pages/EditReservations";
import { EditUserPage } from "../../pages/EditUser";
import { FaqPage } from "../../pages/Faq";
import { NotAllowedPage } from "../../pages/NotAllowed";
import { NotFoundPage } from "../../pages/NotFound";
import { OverrideRequestsPage } from "../../pages/OverrideRequests";
import { OverviewPage } from "../../pages/Overview";
import { PrivacyPage } from "../../pages/Privacy";
import { RegistrationNumbersPage } from "../../pages/RegistrationNumbers";
import { SignedInRouterProps } from "./types";
import { SummaryPage } from "../../pages/Summary";
import { UsersPage } from "../../pages/Users";

export const SignedInRouter = ({ groups }: SignedInRouterProps) => {
  const EditReservations = groups.includes("TeamLeader") ? (
    <EditReservationsPage />
  ) : (
    <NotAllowedPage />
  );

  const OverrideRequests = groups.includes("TeamLeader") ? (
    <OverrideRequestsPage />
  ) : (
    <NotAllowedPage />
  );

  const Users = groups.includes("UserAdmin") ? (
    <UsersPage />
  ) : (
    <NotAllowedPage />
  );

  const AddUser = groups.includes("UserAdmin") ? (
    <AddUserPage />
  ) : (
    <NotAllowedPage />
  );

  const EditUser = groups.includes("UserAdmin") ? (
    <EditUserPage />
  ) : (
    <NotAllowedPage />
  );

  return (
    <Switch>
      <Route exact path="/">
        <SummaryPage />
      </Route>
      <Route path="/daily-details">
        <DailyDetailsPage />
      </Route>
      <Route path="/edit-requests">
        <EditRequestsPage />
      </Route>
      <Route path="/edit-reservations">{EditReservations}</Route>
      <Route path="/faq">
        <FaqPage />
      </Route>
      <Route path="/override-requests">{OverrideRequests}</Route>
      <Route path="/overview">
        <OverviewPage />
      </Route>
      <Route path="/privacy">
        <PrivacyPage />
      </Route>
      <Route path="/profile">
        <EditProfilePage />
      </Route>
      <Route path="/registration-numbers">
        <RegistrationNumbersPage />
      </Route>
      <Route exact path="/users">
        {Users}
      </Route>
      <Route path="/users/add">{AddUser}</Route>
      <Route path="/users/edit/:userId">{EditUser}</Route>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
};
