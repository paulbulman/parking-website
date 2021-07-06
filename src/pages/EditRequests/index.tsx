import { useState } from "react";
import { toast } from "react-toastify";
import { useRequests } from "../../hooks/api/queries/requests";
import { useEditRequests } from "../../hooks/api/mutations/editRequests";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Layout";
import { RequestsCalendar } from "../../components/RequestsCalendar";
import { RequestEdit } from "./types";

export const EditRequestsPage = () => {
  const { data, isLoading, isError } = useRequests();
  const { editRequests, isSaving } = useEditRequests();

  const [requestEdits, setRequestEdits] = useState<RequestEdit[]>([]);

  const handleChange = (requestEdit: RequestEdit) => {
    setRequestEdits((requestEdits) => [...requestEdits, requestEdit]);
  };
  const handleSave = async () => {
    const parameters = { requests: requestEdits };
    try {
      await editRequests(parameters);
      setRequestEdits([]);
      toast("Requests saved successfully.");
    } catch {
      toast("Something went wrong. Please try again.");
    }
  };

  var content = isLoading ? (
    <Loading />
  ) : isError ? (
    <div>Something went wrong. Please try again.</div>
  ) : (
    data && (
      <>
        <RequestsCalendar
          weeks={data.requests.weeks}
          requestEdits={requestEdits}
          onChange={handleChange}
        />
        <button
          onClick={handleSave}
          className="button is-link"
          disabled={isSaving}
        >
          {isSaving ? "Saving" : "Save"}
        </button>
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
