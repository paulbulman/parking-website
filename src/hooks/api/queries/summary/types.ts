import { operations } from "../../types";

export type SummaryRequestResult =
  operations["Summary_Get"]["responses"]["200"]["content"]["application/json"];
export type SummaryRequestError = Error | null;
