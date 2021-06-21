import { UseQueryOptions } from "react-query";
import { operations } from "../../types";

export type RegistrationNumbersRequestParameters = never;
export type RegistrationNumbersRequestResult =
  operations["RegistrationNumbers_Get"]["responses"]["200"]["content"]["application/json"];
export type RegistrationNumbersRequestError = Error | null;

export interface UseRegistrationNumbersParameters {
  parameters?: RegistrationNumbersRequestParameters;
  options?: UseQueryOptions<
    RegistrationNumbersRequestResult,
    RegistrationNumbersRequestError
  >;
}
