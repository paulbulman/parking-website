import { Switch, Route } from "react-router-dom";
import { SummaryPage } from "../../pages/Summary";
import { OverviewPage } from "../../pages/Overview";
import { EditRequestsPage } from "../../pages/EditRequests";
import { EditReservationsPage } from "../../pages/EditReservations";
import { UsersPage } from "../../pages/Users";
import { AddUserPage } from "../../pages/AddUser";
import { EditUserPage } from "../../pages/EditUser";
import { EditProfilePage } from "../../pages/EditProfile";
import { RegistrationNumbersPage } from "../../pages/RegistrationNumbers";
import { SignedInRouterProps } from "./types";
import { DailyDetailsPage } from "../../pages/DailyDetails";
import { NotFoundPage } from "../../pages/NotFound";
import { NotAllowedPage } from "../../pages/NotAllowed";
import { FaqPage } from "../../pages/Faq";
import { PrivacyPage } from "../../pages/Privacy";

export const SignedInRouter = ({ groups }: SignedInRouterProps) => {
  const EditReservations = groups.includes("TeamLeader") ? (
    <EditReservationsPage />
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
      <Route path="/overview">
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
      <Route path="/daily-details">
        <DailyDetailsPage />
      </Route>
      <Route path="/registration-numbers">
        <RegistrationNumbersPage />
      </Route>
      <Route path="/users/add">{AddUser}</Route>
      <Route path="/users/edit/:userId">{EditUser}</Route>
      <Route path="/faq">
        <FaqPage />
      </Route>
      <Route path="/privacy">
        <PrivacyPage />
      </Route>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
};
