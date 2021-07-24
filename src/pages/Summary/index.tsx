import { Link } from "react-router-dom";
import classNames from "classnames";
import { useSummary } from "../../hooks/api/queries/summary";
import { useStayInterrupted } from "../../hooks/api/mutations/stayInterrupted";
import { success, error } from "../../utils/notifications";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Layout";
import { SummaryCalendar } from "../../components/SummaryCalendar";

export const SummaryPage = () => {
  const { data, isLoading, isError } = useSummary();
  const { stayInterrupted, isSaving } = useStayInterrupted();

  const showStayInterrupted =
    data?.stayInterruptedStatus.isAllowed && !data.stayInterruptedStatus.isSet;

  const showReRequestSpace =
    data?.stayInterruptedStatus.isAllowed && data.stayInterruptedStatus.isSet;

  const buttonClasses = classNames({
    "button ": true,
    "ml-4": true,
    "is-loading": isSaving,
  });

  const handleStayInterrupted = async () => {
    await updateStayInterrupted(true);
  };

  const handleReRequestSpace = async () => {
    await updateStayInterrupted(false);
  };

  const updateStayInterrupted = async (value: boolean) => {
    if (!data) {
      return;
    }

    try {
      await stayInterrupted({
        localDate: data.stayInterruptedStatus.localDate,
        stayInterrupted: value,
      });
      success("Request updated successfully.");
    } catch {
      error("Something went wrong. Please try again.");
    }
  };

  var content = isLoading ? (
    <Loading />
  ) : isError ? (
    <div>Something went wrong. Please try again.</div>
  ) : (
    data && <SummaryCalendar weeks={data.summary.weeks} />
  );

  return (
    <Layout
      heading="Summary"
      subheading="Your requests up to the end of next month:"
    >
      <div className="is=flex">
        <Link className="button" to="/edit-requests">
          Edit requests
        </Link>
        {showStayInterrupted && (
          <button onClick={handleStayInterrupted} className={buttonClasses}>
            Stay interrupted
          </button>
        )}
        {showReRequestSpace && (
          <button onClick={handleReRequestSpace} className={buttonClasses}>
            Re-request space
          </button>
        )}
      </div>
      <div className="pt-5">{content}</div>
    </Layout>
  );
};
