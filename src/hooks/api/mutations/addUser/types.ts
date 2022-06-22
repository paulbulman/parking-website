import { operations } from "../../types";

export type AddUserRequestBody =
  operations["Users_Post"]["requestBody"]["content"]["application/json"];
export type AddUserRequestResult =
  operations["Users_Post"]["responses"]["200"]["content"]["application/json"];
