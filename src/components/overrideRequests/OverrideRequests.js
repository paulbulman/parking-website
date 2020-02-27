import React, { useEffect, useState } from "react";
import { getUsersData } from "../../services/usersService";
import EditRequestsCommon from "../editRequests/EditRequestsCommon";

export default () => {
  const [userId, setUserId] = useState("");
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const loadUsersData = async () => {
      setUsersData(await getUsersData());
    };

    loadUsersData();
  }, []);

  return (
    <>
      <h2>Override Requests</h2>
      <h4>Override requests up to the end of next month:</h4>
      <hr />
      <EditRequestsCommon userId={userId} />
    </>
  );
};