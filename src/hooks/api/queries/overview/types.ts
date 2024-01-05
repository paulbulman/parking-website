import { operations } from "../../types";

export type OverviewRequestResult =
  operations["Overview_Get"]["responses"]["200"]["content"]["application/json"];
export type OverviewRequestError = Error | null;
