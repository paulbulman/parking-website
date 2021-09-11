import { operations } from "../../types";
import { AxiosError } from "axios";

export type UserRequestsRequestParameters =
  operations["Requests_GetById"]["parameters"]["path"];
export type UserRequestsRequestResult =
  operations["Requests_GetById"]["responses"]["200"]["content"]["application/json"];
export type UserRequestsRequestError = AxiosError<
  operations["Requests_GetById"]["responses"]["404"]["content"]["application/json"]
>;
