import axios from "axios";
import { useQuery } from "react-query";
import { useAuthContext } from "../../../context/auth";
import type {
  UserRequestError,
  UserRequestResult,
  UserRequestParameters,
} from "./types";

const endpoint = "users";

const getUser = async (userId: string, getToken: () => Promise<string>) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const token = await getToken();
  const { data } = await axios.get<UserRequestResult>(
    `${baseUrl}/${endpoint}/${userId}`,
    { headers: { Authorization: "Bearer " + token } }
  );
  return data;
};

export const useUser = ({ userId }: UserRequestParameters) => {
  const { getToken } = useAuthContext();
  return useQuery<UserRequestResult, UserRequestError>([endpoint, userId], () =>
    getUser(userId, getToken)
  );
};
