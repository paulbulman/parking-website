import { get } from "./apiHelpers";

export const getRegistrationNumbers = async token =>
  await get("registrationNumbers", token);
