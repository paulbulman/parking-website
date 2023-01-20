import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../context/auth";
import { get } from "../../helpers";
import { UsersListRequestError, UsersListRequestResult } from "./types";

export const useUsersList = () => {
  const endpoint = "usersList";

  const { getToken } = useAuthContext();

  return useQuery<UsersListRequestResult, UsersListRequestError>(
    [endpoint],
    () => get<UsersListRequestResult>(getToken, endpoint)
  );
};
