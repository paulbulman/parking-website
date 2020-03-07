import React, { useState } from "react";
import Profile from "./Profile";

export default () => {
  const [details, setDetails] = useState({
    registrationNumber: "",
    alternativeRegistrationNumber: ""
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (k, v) => setDetails({ ...details, [k]: v });

  const handleSave = async () => {
    setErrorMessage("");
    if (!details.registrationNumber) {
      setErrorMessage("First car registration number is required");
      return;
    }

    alert(
      `Save ${details.registrationNumber}, ${details.alternativeRegistrationNumber}`
    );
  };

  return (
    <Profile
      registrationNumber={details.registrationNumber}
      alternativeRegistrationNumber={details.alternativeRegistrationNumber}
      errorMessage={errorMessage}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
};
