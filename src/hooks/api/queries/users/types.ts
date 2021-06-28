import { operations } from "../../types";

export type UsersRequestResult =
  operations["Users_Get"]["responses"]["200"]["content"]["application/json"];
export type UsersRequestError = Error | null;
