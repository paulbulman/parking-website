import { UseQueryOptions } from "react-query";
import { operations } from "../../types";
import { AxiosError } from "axios";

export type UserRequestParameters =
  operations["Users_GetById"]["parameters"]["path"];
export type UserRequestResult =
  operations["Users_GetById"]["responses"]["200"]["content"]["application/json"];
export type UserRequestError = AxiosError<
  operations["Users_GetById"]["responses"]["404"]["content"]["application/json"]
>;

export interface UseUserParameters {
  parameters: UserRequestParameters;
  options?: UseQueryOptions<UserRequestResult, UserRequestParameters>;
}
