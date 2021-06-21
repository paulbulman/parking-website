import { UseQueryOptions } from "react-query";
import { operations } from "../../types";

export type UsersRequestParameters = never;
export type UsersRequestResult =
  operations["Users_Get"]["responses"]["200"]["content"]["application/json"];
export type UsersRequestError = Error | null;

export interface UseUsersParameters {
  parameters?: UsersRequestParameters;
  options?: UseQueryOptions<UsersRequestResult, UsersRequestError>;
}
