import React, { useState, useEffect } from "react";
import EditRequestsCommon from "./EditRequestsCommon";
import { getCurrentUserId } from "../../services/authenticationService";

export default () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadUserId = async () => {
      setUserId(await getCurrentUserId());
    };

    loadUserId();
  }, []);

  return (
    <>
      <h2>Edit Requests</h2>
      <h4>Edit requests up to the end of next month:</h4>
      <hr />
      {userId && <EditRequestsCommon userId={userId} />}
    </>
  );
};
