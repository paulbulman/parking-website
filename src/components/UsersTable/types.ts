import { UsersRequestResult } from "../../hooks/api/queries/users/types";

export interface UsersTableProps {
  users: UsersRequestResult["users"];
  onEdit: (userId: UsersRequestResult["users"][number]) => void;
  onDelete: (userId: UsersRequestResult["users"][number]) => Promise<void>;
}
