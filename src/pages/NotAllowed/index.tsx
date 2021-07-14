import { Layout } from "../../components/Layout";

export const NotAllowedPage = () => {
  return (
    <Layout
      heading="Not allowed"
      subheading="You do not have permission to view the requested page."
    >
      <div>
        If you think you are seeing this message in error, please contact your
        manager.
      </div>
    </Layout>
  );
};
