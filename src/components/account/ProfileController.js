import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import { getCurrentUserId } from "../../services/authenticationService";
import { getProfile, updateProfile } from "../../api/profileApi";

export default () => {
  const [userId, setUserId] = useState(null);
  const [details, setDetails] = useState({
    registrationNumber: "",
    alternativeRegistrationNumber: ""
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadUserId = async () => {
      setUserId(await getCurrentUserId());
    };

    loadUserId();
  }, []);

  useEffect(() => {
    const loadProfileData = async () => {
      setDetails(await getProfile(userId));
    };

    if (userId) {
      loadProfileData();
    }
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
