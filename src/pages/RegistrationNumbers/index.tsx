import { useRegistrationNumbers } from "../../hooks/api/queries/registrationNumbers";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Layout";
import { RegistrationNumbersTable } from "../../components/RegistrationNumbersTable";

export const RegistrationNumbersPage = () => {
  const { data, isLoading, isError } = useRegistrationNumbers();

  const content = isLoading ? (
    <Loading />
  ) : isError ? (
    <div>Something went wrong. Please try again.</div>
  ) : (
    data && (
      <RegistrationNumbersTable
        registrationNumbers={data.registrationNumbers}
      />
    )
  );

  return (
    <Layout
      heading="Registration numbers"
      subheading="Also known as, 'Who's parked behind me?'"
    >
      {content}
    </Layout>
  );
};
