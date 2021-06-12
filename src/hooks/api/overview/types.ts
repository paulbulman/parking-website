import { UseQueryOptions } from "react-query";
import type { operations } from "../types";

export type OverviewRequestParameters = never;
export type OverviewRequestResult =
  operations["Overview_Get"]["responses"]["200"]["content"]["application/json"];
export type OverviewRequestError = Error | null;

export interface UseOverviewParameters {
  parameters?: OverviewRequestParameters;
  options?: UseQueryOptions<OverviewRequestResult, OverviewRequestError>;
}
