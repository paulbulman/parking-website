import { useState } from "react";
import { useRegistrationNumbers } from "../../hooks/api/queries/registrationNumbers";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Layout";
import { RegistrationNumbersTable } from "../../components/RegistrationNumbersTable";
import { FindRegistrationNumberForm } from "../../components/FindRegistrationNumberForm";
import { FindRegistrationNumberFormValues } from "../../components/FindRegistrationNumberForm/types";

export const RegistrationNumbersPage = () => {
  const [searchString, setSearchString] = useState("");

  const { data, isLoading, isError } = useRegistrationNumbers({
    searchString,
  });

  const handleSubmit = async (values: FindRegistrationNumberFormValues) => {
    setSearchString(values.registrationNumber);
  };

  const content = isLoading ? (
    <Loading />
  ) : isError ? (
    <div>Something went wrong. Please try again.</div>
  ) : (
    data && (
      <div className="mt-5">
        <RegistrationNumbersTable
          registrationNumbers={data.registrationNumbers}
        />
      </div>
    )
  );

  return (
    <Layout
      heading="Registration numbers"
      subheading="Also known as, 'Who's parked behind me?'"
    >
      <>
        <FindRegistrationNumberForm
          initialValues={{ registrationNumber: "" }}
          onChange={() => {}}
          onSubmit={handleSubmit}
        />
        {content}
      </>
    </Layout>
  );
};
