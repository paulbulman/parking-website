import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addUser } from "../../api/manageUsersApi";

import AddUser from "./AddUser";

export default () => {
  const history = useHistory();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    confirmEmailAddress: ""
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (k, v) => setUserData({ ...userData, [k]: v });

  const handleCreate = async () => {
    setErrorMessage("");

    if (userData.emailAddress !== userData.confirmEmailAddress) {
      setErrorMessage("Email addresses do not match");
      return;
    }

    try {
      await addUser({
        firstName: userData.firstName,
        lastName: userData.lastName,
        emailAddress: userData.emailAddress
      });
      history.push("/ManageUsers");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <AddUser
        emailAddress={userData.emailAddress}
        confirmEmailAddress={userData.confirmEmailAddress}
        errorMessage={errorMessage}
        onChange={handleChange}
        onCreate={handleCreate}
      />
    </>
  );
};
