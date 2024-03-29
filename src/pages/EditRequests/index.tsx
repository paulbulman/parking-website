import { FormEvent, useState, useEffect } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";
import { Prompt } from "../../hooks/prompt";
import { useRequests } from "../../hooks/api/queries/requests";
import { useEditRequests } from "../../hooks/api/mutations/editRequests";
import { success, error } from "../../utils/notifications";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Layout";
import { RequestsCalendar } from "../../components/RequestsCalendar";
import { RequestEdit } from "./types";
import { FormButtons } from "../../components/FormButtons";

export const EditRequestsPage = () => {
  const [isCancelling, setIsCancelling] = useState(false);
  const [requestEdits, setRequestEdits] = useState<RequestEdit[]>([]);

  const navigate = useNavigate();

  const { data, isLoading, isError } = useRequests();
  const { editRequests, isSaving } = useEditRequests();

  const handleChange = (requestEdit: RequestEdit) => {
    setRequestEdits((requestEdits) => [...requestEdits, requestEdit]);
  };

  const handleSave = async (event: FormEvent) => {
    event.preventDefault();

    const parameters = { requests: requestEdits };
    try {
      await editRequests(parameters);

      flushSync(() => {
        setRequestEdits([]);
      });

      success("Requests saved successfully.");
      navigate("/");
    } catch {
      error("Something went wrong. Please try again.");
    }
  };

  const handleCancel = () => {
    setRequestEdits([]);
    setIsCancelling(true);
  };

  useEffect(() => {
    if (isCancelling) {
      navigate("/");
    }
  }, [isCancelling, navigate]);

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
    <>
      <Prompt
        when={requestEdits.length > 0}
        message="Are you sure? You currently have unsaved changes."
      />
      <Layout
        heading="Edit requests"
        subheading="Edit requests up to the end of next month:"
      >
        {content}
      </Layout>
    </>
  );
};
