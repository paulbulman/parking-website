import { UseQueryOptions } from "react-query";
import { operations } from "../../types";

export type SummaryRequestParameters = never;
export type SummaryRequestResult =
  operations["Summary_Get"]["responses"]["200"]["content"]["application/json"];
export type SummaryRequestError = Error | null;

export interface UseSummaryParameters {
  parameters?: SummaryRequestParameters;
  options?: UseQueryOptions<SummaryRequestResult, SummaryRequestError>;
}
