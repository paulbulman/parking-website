import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import { getProfile, updateProfile } from "../../api/profileApi";

export default () => {
  const userId = "USER_ID";
  const [details, setDetails] = useState({
    registrationNumber: "",
    alternativeRegistrationNumber: ""
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadProfileData = async () => {
      setDetails(await getProfile(userId));
    };

    loadProfileData();
  }, [userId]);

  const handleChange = (k, v) => setDetails({ ...details, [k]: v });

  const handleSave = async () => {
    setErrorMessage("");
    if (!details.registrationNumber) {
      setErrorMessage("First car registration number is required");
      return;
    }

    await updateProfile(userId, details);
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
