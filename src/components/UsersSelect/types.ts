import { UsersListRequestResult } from "../../hooks/api/queries/usersList/types";

export interface UsersSelectProps {
  users: UsersListRequestResult["users"];
  userId: string;
  onChange: (userId: string) => void;
}
