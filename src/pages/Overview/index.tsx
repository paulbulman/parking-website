import { useOverview } from "../../hooks/api/queries/overview";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Layout";
import { OverviewCalendar } from "../../components/OverviewCalendar";

export const OverviewPage = () => {
  const { data, isInitialLoading, isError } = useOverview();

  var content = isInitialLoading ? (
    <Loading />
  ) : isError ? (
    <div>Something went wrong. Please try again.</div>
  ) : (
    data && <OverviewCalendar weeks={data.overview.weeks} />
  );

  return (
    <Layout
      heading="Overview"
      subheading="All requests up to the end of next month:"
    >
      {content}
    </Layout>
  );
};
