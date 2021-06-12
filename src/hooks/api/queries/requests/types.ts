import { UseQueryOptions } from "react-query";
import type { operations } from "../../types";

export type RequestsRequestParameters = never;
export type RequestsRequestResult =
  operations["Requests_Get"]["responses"]["200"]["content"]["application/json"];
export type RequestsRequestError = Error | null;

export interface UseRequestsParameters {
  parameters?: RequestsRequestParameters;
  options?: UseQueryOptions<RequestsRequestResult, RequestsRequestError>;
}