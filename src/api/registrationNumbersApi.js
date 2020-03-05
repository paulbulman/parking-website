import { get } from "./apiHelpers";

export const getRegistrationNumbers = async () =>
  await get("registrationNumbers");
