import querystring from "query-string";
import { Link, useLocation, useHistory } from "react-router-dom";
import { parseISO, isValid, isSameDay } from "date-fns";
import { useDailyDetails } from "../../hooks/api/queries/dailyDetails";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Layout";
import { DatePicker } from "../../components/DatePicker";
import { DailyDetails } from "../../components/DailyDetails";
import { formatDate, getDailyData } from "./utils";

export const DailyDetailsPage = () => {
  const location = useLocation();
  const history = useHistory();

  const { data, isLoading, isError } = useDailyDetails();

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
    history.push(`${location.pathname}?localDate=${formatDate(selectedDate)}`);
  };

  var content = isLoading ? (
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
        <DailyDetails details={getDailyData(data.details, selectedDate)} />
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
