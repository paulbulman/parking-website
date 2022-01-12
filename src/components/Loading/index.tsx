import { Oval } from "react-loader-spinner";

export const Loading = () => {
  return (
    <>
      <div className="has-text-centered">Loading, please wait...</div>
      <div className="has-text-centered mt-3">
        <Oval wrapperStyle={{ display: "" }} width="40" height="40" />
      </div>
    </>
  );
};
