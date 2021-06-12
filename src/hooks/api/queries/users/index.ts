import axios from "axios";
import { useQuery } from "react-query";
import { useAuthContext } from "../../../context/auth";
import type { UsersRequestError, UsersRequestResult } from "./types";

const endpoint = "users";

const getUsers = async (getToken: () => Promise<string>) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const token = await getToken();
  const { data } = await axios.get<UsersRequestResult>(
    `${baseUrl}/${endpoint}`,
    { headers: { Authorization: "Bearer " + token } }
  );
  return data;
};

export const useUsers = () => {
  const { getToken } = useAuthContext();
  return useQuery<UsersRequestResult, UsersRequestError>(endpoint, () =>
    getUsers(getToken)
  );
};
