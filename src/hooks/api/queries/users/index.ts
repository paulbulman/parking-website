import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../context/auth";
import { get } from "../../helpers";
import { UsersRequestResult } from "./types";

export const useUsers = () => {
  const endpoint = "users";

  const { getToken } = useAuthContext();

  return useQuery({
    queryKey: [endpoint],

    queryFn: () => get<UsersRequestResult>(getToken, endpoint),
  });
};
