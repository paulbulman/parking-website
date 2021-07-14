import { Layout } from "../../components/Layout";

export const NotFoundPage = () => {
  return (
    <Layout
      heading="Not found"
      subheading="The page you requested could not be found."
    >
      <div>
        If you arrived here by following a link within the app, please create a
        bug report{" "}
        <a href={`${process.env.REACT_APP_REPOSITORY_URL}/issues`}>here</a>.
      </div>
    </Layout>
  );
};
