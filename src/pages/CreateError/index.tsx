import { useState } from "react";
import { Layout } from "../../components/Layout";

export const CreateErrorPage = () => {
  const [isError, setIsError] = useState(false);

  if (isError) {
    throw new Error("Error simulated for testing purposes.");
  }
  
  return (
    <Layout
      heading="Create error"
      subheading="Create an error for testing purposes"
    >
      <button className="button is-danger" onClick={() => setIsError(true)}>
        Scary red button
      </button>
    </Layout>
  );
};
