import { operations } from "../../types";

export type StayInterruptedRequestBody =
  operations["DailyDetails_Patch"]["requestBody"]["content"]["application/json"];
export type StayInterruptedRequestResult =
  operations["DailyDetails_Patch"]["responses"]["200"]["content"]["application/json"];
export type StayInterruptedRequestError = Error | null;
