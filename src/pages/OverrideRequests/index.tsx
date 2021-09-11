import { FormEvent, useState } from "react";
import { Prompt } from "react-router-dom";
import { useUsersList } from "../../hooks/api/queries/usersList";
import { useUserRequests } from "../../hooks/api/queries/userRequests";
import { useEditUserRequests } from "../../hooks/api/mutations/editUserRequests";
import { success, error } from "../../utils/notifications";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Layout";
import { RequestsCalendar } from "../../components/RequestsCalendar";
import { RequestEdit } from "../EditRequests/types";
import { FormButtons } from "../../components/FormButtons";
import { UsersSelect } from "../../components/UsersSelect";

export const OverrideRequestsPage = () => {
  const [requestEdits, setRequestEdits] = useState<RequestEdit[]>([]);
  const [userId, setUserId] = useState("");

  const {
    data: usersData,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useUsersList();

  const {
    data: requestsData,
    isLoading: isRequestsLoading,
    isError: isRequestsError,
  } = useUserRequests({ userId });

  const { editUserRequests, isSaving } = useEditUserRequests({ userId });

  const unsavedChangesExist = requestEdits.length > 0;
  const unsavedChangesMessage =
    "Are you sure? You currently have unsaved changes.";

  const updateUser = (userId: string) => {
    setRequestEdits([]);
    setUserId(userId);
  };

  const handleUserChange = (userId: string) => {
    if (!unsavedChangesExist || window.confirm(unsavedChangesMessage)) {
      updateUser(userId);
    }
  };

  const handleRequestChange = (requestEdit: RequestEdit) => {
    setRequestEdits((requestEdits) => [...requestEdits, requestEdit]);
  };

  const handleSave = async (event: FormEvent) => {
    event.preventDefault();

    const parameters = { requests: requestEdits };
    try {
      await editUserRequests(parameters);
      updateUser("");
      success("Requests saved successfully.");
    } catch {
      error("Something went wrong. Please try again.");
    }
  };

  const handleCancel = () => {
    updateUser("");
  };

  var content = !Boolean(userId) ? null : (
    <div className="mt-5">
      {isRequestsLoading ? (
        <Loading />
      ) : isRequestsError ? (
        <div>Something went wrong. Please try again.</div>
      ) : (
        requestsData && (
          <>
            <form onSubmit={handleSave}>
              <RequestsCalendar
                weeks={requestsData.requests.weeks}
                requestEdits={requestEdits}
                onChange={handleRequestChange}
              />
              <FormButtons isSubmitting={isSaving} onCancel={handleCancel} />
            </form>
          </>
        )
      )}
    </div>
  );

  var wrapper = isUsersLoading ? (
    <Loading />
  ) : isUsersError ? (
    <div>Something went wrong. Please try again.</div>
  ) : (
    usersData && (
      <>
        <UsersSelect
          users={usersData.users}
          userId={userId}
          onChange={handleUserChange}
        />
        {content}
      </>
    )
  );

  return (
    <>
      <Prompt when={unsavedChangesExist} message={unsavedChangesMessage} />
      <Layout
        heading="Override requests"
        subheading="Edit requests for other users"
      >
        {wrapper}
      </Layout>
    </>
  );
};
