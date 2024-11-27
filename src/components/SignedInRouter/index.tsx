import { createBrowserRouter, RouterProvider } from "react-router";
import { useAuthContext } from "../../hooks/context/auth";
import { AddUserPage } from "../../pages/AddUser";
import { CreateErrorPage } from "../../pages/CreateError";
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
import { SummaryPage } from "../../pages/Summary";
import { UsersPage } from "../../pages/Users";
import { Layout } from "./layout";

export const SignedInRouter = () => {
  const { getGroups } = useAuthContext();

  const groups = getGroups();

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

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <SummaryPage /> },
        { path: "/create-error", element: <CreateErrorPage /> },
        { path: "/daily-details", element: <DailyDetailsPage /> },
        { path: "/edit-requests", element: <EditRequestsPage /> },
        { path: "/edit-reservations", element: EditReservations },
        { path: "/faq", element: <FaqPage /> },
        { path: "/override-requests", element: OverrideRequests },
        { path: "/overview", element: <OverviewPage /> },
        { path: "/privacy", element: <PrivacyPage /> },
        { path: "/profile", element: <EditProfilePage /> },
        { path: "/registration-numbers", element: <RegistrationNumbersPage /> },
        { path: "/users", element: Users },
        { path: "/users/add", element: AddUser },
        { path: "/users/edit/:userId", element: EditUser },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
