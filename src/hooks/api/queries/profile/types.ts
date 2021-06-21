import { UseQueryOptions } from "react-query";
import { operations } from "../../types";

export type ProfileRequestParameters = never;
export type ProfileRequestResult =
  operations["Profiles_Get"]["responses"]["200"]["content"]["application/json"];
export type ProfileRequestError = Error | null;

export interface UseProfileParameters {
  parameters?: ProfileRequestParameters;
  options?: UseQueryOptions<ProfileRequestResult, ProfileRequestError>;
}
