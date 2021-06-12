import type { operations } from "../../types";

export type EditRequestsRequestParameters =
  operations["Requests_Patch"]["requestBody"]["content"]["application/json"];
export type EditRequestsRequestResult =
  operations["Requests_Patch"]["responses"]["200"]["content"]["application/json"];
export type EditRequestsRequestError = Error | null;
