import { useSummary } from "../../hooks/api/queries/summary";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Layout";
import { SummaryCalendar } from "../../components/SummaryCalendar";

export const SummaryPage = () => {
  const { data, isLoading, isError } = useSummary();

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
      {content}
    </Layout>
  );
};
