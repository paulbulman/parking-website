import { operations } from "../../types";

export type RequestsRequestResult =
  operations["Requests_Get"]["responses"]["200"]["content"]["application/json"];
export type RequestsRequestError = Error | null;
