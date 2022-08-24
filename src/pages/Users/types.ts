import { UsersRequestResult } from "../../hooks/api/queries/users/types";

export type User = UsersRequestResult["users"][number];
