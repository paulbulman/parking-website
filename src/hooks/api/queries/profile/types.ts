import { operations } from "../../types";

export type ProfileRequestResult =
  operations["Profiles_Get"]["responses"]["200"]["content"]["application/json"];
