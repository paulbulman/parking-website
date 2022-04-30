import { operations } from "../../types";

export type UserRequestsRequestParameters =
  operations["Requests_GetById"]["parameters"]["path"];
export type UserRequestsRequestResult =
  operations["Requests_GetById"]["responses"]["200"]["content"]["application/json"];
