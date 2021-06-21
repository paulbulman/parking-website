import { operations } from "../../types";

export type EditProfileRequestBody =
  operations["Profiles_Patch"]["requestBody"]["content"]["application/json"];
export type EditProfileRequestResult =
  operations["Profiles_Patch"]["responses"]["200"]["content"]["application/json"];
export type EditProfileRequestError = Error | null;
