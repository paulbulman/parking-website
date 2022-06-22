import { operations } from "../../types";

export type EditUserRequestParameters =
  operations["Users_Patch"]["parameters"]["path"];
export type EditUserRequestBody =
  operations["Users_Patch"]["requestBody"]["content"]["application/json"];
export type EditUserRequestResult =
  operations["Users_Patch"]["responses"]["200"]["content"]["application/json"];
