import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUser, updateUser } from "../../api/manageUsersApi";

import EditUser from "./EditUser";

export default () => {
  const { userId } = useParams();
  const history = useHistory();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    registrationNumber: "",
    alternativeRegistrationNumber: "",
    commuteDistance: ""
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadUserData = async () => {
      setUserData(await getUser(userId));
    };

    loadUserData();
  }, [userId]);

  const handleChange = (k, v) => setUserData({ ...userData, [k]: v });

  const handleSave = async () => {
    try {
      await updateUser(userId, userData);
      history.push("/ManageUsers");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <EditUser
        firstName={userData.firstName}
        lastName={userData.lastName}
        registrationNumber={userData.registrationNumber}
        alternativeRegistrationNumber={userData.alternativeRegistrationNumber}
        commuteDistance={userData.commuteDistance}
        errorMessage={errorMessage}
        onChange={handleChange}
        onSave={handleSave}
      />
    </>
  );
};
