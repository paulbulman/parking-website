import querystring from "query-string";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { parseISO, isValid, isSameDay } from "date-fns";
import { useDailyDetails } from "../../hooks/api/queries/dailyDetails";
import { useStayInterrupted } from "../../hooks/api/mutations/stayInterrupted";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Layout";
import { DatePicker } from "../../components/DatePicker";
import { DailyDetails } from "../../components/DailyDetails";
import { success, error } from "../../utils/notifications";
import { formatDate, getDailyData } from "./utils";

export const DailyDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isInitialLoading, isError } = useDailyDetails();
  const { stayInterrupted, isSaving } = useStayInterrupted();

  const query = querystring.parse(location.search);
  const queryLocalDateString = query.localDate as string;

  const requestedDate = parseISO(queryLocalDateString);

  const enabledDates = data?.details.map((d) => parseISO(d.localDate)) ?? [];

  const isDisabled = (day: Date) =>
    enabledDates.every((d) => !isSameDay(day, d));

  const selectedDate =
    isValid(requestedDate) && !isDisabled(requestedDate)
      ? requestedDate
      : enabledDates[0];

  const setSelectedDate = (selectedDate: Date) => {
    navigate(`${location.pathname}?localDate=${formatDate(selectedDate)}`);
  };

  const updateStayInterruptedStatus = async (value: boolean) => {
    if (!data) {
      return;
    }

    try {
      await stayInterrupted({
        localDate: formatDate(selectedDate),
        stayInterrupted: value,
      });
      success("Request updated successfully.");
    } catch {
      error("Something went wrong. Please try again.");
    }
  };

  var content = isInitialLoading ? (
    <Loading />
  ) : isError ? (
    <div>Something went wrong. Please try again.</div>
  ) : (
    data && (
      <>
        <div className="control has-icons-left pb-5">
          <DatePicker
            selectedDate={selectedDate}
            disabledDays={isDisabled}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <DailyDetails
          details={getDailyData(data.details, selectedDate)}
          isSaving={isSaving}
          updateStayInterruptedStatus={updateStayInterruptedStatus}
        />
        <div className="pb-5">
          <Link to="/" className="button is-link is-light">
            Back to summary
          </Link>
        </div>
      </>
    )
  );

  return (
    <Layout heading="Daily details" subheading="Requests for all users">
      {content}
    </Layout>
  );
};
