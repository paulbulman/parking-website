import { operations } from "../../types";

export type DailyDetailsRequestResult =
  operations["DailyDetails_Get"]["responses"]["200"]["content"]["application/json"];
export type DailyDetailsRequestError = Error | null;
