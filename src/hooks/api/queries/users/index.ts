import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../context/auth";
import { get } from "../../helpers";
import { UsersRequestError, UsersRequestResult } from "./types";

export const useUsers = () => {
  const endpoint = "users";

  const { getToken } = useAuthContext();

  return useQuery<UsersRequestResult, UsersRequestError>([endpoint], () =>
    get<UsersRequestResult>(getToken, endpoint)
  );
};
