import { operations } from "../../types";

export type RegistrationNumbersRequestResult =
  operations["RegistrationNumbers_Get"]["responses"]["200"]["content"]["application/json"];
export type RegistrationNumbersRequestError = Error | null;
