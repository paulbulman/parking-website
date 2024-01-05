import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../context/auth";
import { get } from "../../helpers";
import { UsersListRequestResult } from "./types";

export const useUsersList = () => {
  const endpoint = "usersList";

  const { getToken } = useAuthContext();

  return useQuery({
    queryKey: [endpoint],
    queryFn: () => get<UsersListRequestResult>(getToken, endpoint),
  });
};
