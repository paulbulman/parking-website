import type { operations } from "../../types";

export type AddUserRequestParameters =
  operations["Users_Post"]["requestBody"]["content"]["application/json"];
export type AddUserRequestResult =
  operations["Users_Post"]["responses"]["200"]["content"]["application/json"];
export type AddUserRequestError = Error | null;
