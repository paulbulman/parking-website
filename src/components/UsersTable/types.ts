import { UsersRequestResult } from "../../hooks/api/queries/users/types";

export interface UsersTableProps {
  users: UsersRequestResult["users"];
  onEdit: (userId: string) => void;
}
