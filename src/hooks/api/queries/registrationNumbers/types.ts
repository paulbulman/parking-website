import { operations } from "../../types";

export type RegistrationNumbersRequestParameters =
  operations["RegistrationNumbers_Get"]["parameters"]["path"];
export type RegistrationNumbersRequestResult =
  operations["RegistrationNumbers_Get"]["responses"]["200"]["content"]["application/json"];
export type RegistrationNumbersRequestError = Error | null;
