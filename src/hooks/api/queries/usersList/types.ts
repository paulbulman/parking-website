import { operations } from "../../types";

export type UsersListRequestResult =
  operations["UsersList_Get"]["responses"]["200"]["content"]["application/json"];
export type UsersListRequestError = Error | null;
