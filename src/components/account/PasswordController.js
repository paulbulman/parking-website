import React, { useState } from "react";
import Password from "./Password";
import { changePassword } from "../../services/authenticationService";

export default () => {
  const createInitialState = () => ({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const [details, setDetails] = useState(createInitialState());
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (k, v) => setDetails({ ...details, [k]: v });

  const handleSave = async () => {
    setDetails(createInitialState());
    setErrorMessage("");

    if (details.newPassword !== details.confirmNewPassword) {
      setErrorMessage("New passwords do not match");
      return;
    }

    if (await changePassword(details.oldPassword, details.newPassword)) {
      alert("Password updated successfully.")
    }
    else {
      setErrorMessage("Updating password failed. Please try again.");
    }
  };

  return (
    <Password
      oldPassword={details.oldPassword}
      newPassword={details.newPassword}
      confirmNewPassword={details.confirmNewPassword}
      errorMessage={errorMessage}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
};
