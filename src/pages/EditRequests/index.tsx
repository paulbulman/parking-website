import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRequests } from "../../hooks/api/queries/requests";
import { useEditRequests } from "../../hooks/api/mutations/editRequests";
import { success, error } from "../../utils/notifications";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Layout";
import { RequestsCalendar } from "../../components/RequestsCalendar";
import { RequestEdit } from "./types";
import { FormButtons } from "../../components/FormButtons";

export const EditRequestsPage = () => {
  const history = useHistory();

  const { data, isLoading, isError } = useRequests();
  const { editRequests, isSaving } = useEditRequests();

  const [requestEdits, setRequestEdits] = useState<RequestEdit[]>([]);

  const handleChange = (requestEdit: RequestEdit) => {
    setRequestEdits((requestEdits) => [...requestEdits, requestEdit]);
  };
  const handleSave = async (event: FormEvent) => {
    event.preventDefault();

    const parameters = { requests: requestEdits };
    try {
      await editRequests(parameters);
      setRequestEdits([]);
      success("Requests saved successfully.");
      history.push("/");
    } catch {
      error("Something went wrong. Please try again.");
    }
  };

  const handleCancel = () => {
    history.push("/");
  };

  var content = isLoading ? (
    <Loading />
  ) : isError ? (
    <div>Something went wrong. Please try again.</div>
  ) : (
    data && (
      <>
        <form onSubmit={handleSave}>
          <RequestsCalendar
            weeks={data.requests.weeks}
            requestEdits={requestEdits}
            onChange={handleChange}
          />
          <FormButtons isSubmitting={isSaving} onCancel={handleCancel} />
        </form>
      </>
    )
  );

  return (
    <Layout
      heading="Edit requests"
      subheading="Edit requests up to the end of next month:"
    >
      {content}
    </Layout>
  );
};
