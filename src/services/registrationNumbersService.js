import { getUserIdToken } from "./authenticationService";
import { get } from "../api/apiHelpers";

export const getRegistrationNumbersData = async () => {
  const token = await getUserIdToken();
  return await get("registrationNumbers", token);
};
