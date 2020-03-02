import { getRegistrationNumbers } from "../api/registrationNumbersApi";
import { getUserIdToken } from "./authenticationService";

export const getRegistrationNumbersData = async () => {
  const token = await getUserIdToken();
  return await getRegistrationNumbers(token);
};
