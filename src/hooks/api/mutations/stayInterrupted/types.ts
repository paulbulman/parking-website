import { operations } from "../../types";

export type StayInterruptedRequestBody =
  operations["Summary_UpdateStayInterrupted"]["requestBody"]["content"]["application/json"];
export type StayInterruptedRequestResult =
  operations["Summary_UpdateStayInterrupted"]["responses"]["200"]["content"]["application/json"];
export type StayInterruptedRequestError = Error | null;
