import React, { useEffect, useState } from "react";
import { getUsers } from "../api/usersApi";
import EditRequestsCommon from "./editRequests/EditRequestsCommon";

export default () => {
  const [userId, setUserId] = useState("");
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const loadUsersData = async () => {
      setUsersData(await getUsers());
    };

    loadUsersData();
  }, []);

  const handleUserChange = event => {
    setUserId(event.target.value);
  };

  return (
    <>
      <h2>Override Requests</h2>
      <h4>Override requests up to the end of next month:</h4>
      <hr />
      <div className="form-group">
        <select onChange={handleUserChange}>
          <option value="">Select user</option>
          {usersData.map(u => (
            <option key={u.userId} value={u.userId}>
              {u.name}
            </option>
          ))}
        </select>
      </div>
      {userId ? <EditRequestsCommon userId={userId} /> : <></>}
    </>
  );
};
