import { operations } from "../../types";

export type UserRequestParameters =
  operations["Users_GetById"]["parameters"]["path"];
export type UserRequestResult =
  operations["Users_GetById"]["responses"]["200"]["content"]["application/json"];
