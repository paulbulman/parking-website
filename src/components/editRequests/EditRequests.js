import React from "react";
import EditRequestsCommon from "./EditRequestsCommon";

export default () => {
  const userId = "USER_ID";

  return (
    <>
      <h2>Edit Requests</h2>
      <h4>Edit requests up to the end of next month:</h4>
      <hr />
      <EditRequestsCommon userId={userId} />
    </>
  );
};
