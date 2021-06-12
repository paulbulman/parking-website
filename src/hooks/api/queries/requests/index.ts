import axios from "axios";
import { useQuery } from "react-query";
import { useAuthContext } from "../../../context/auth";
import type { RequestsRequestError, RequestsRequestResult } from "./types";

const endpoint = "requests";

const getRequests = async (getToken: () => Promise<string>) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const token = await getToken();
  const { data } = await axios.get<RequestsRequestResult>(
    `${baseUrl}/${endpoint}`,
    { headers: { Authorization: "Bearer " + token } }
  );
  return data;
};

export const useRequests = () => {
  const { getToken } = useAuthContext();
  return useQuery<RequestsRequestResult, RequestsRequestError>(endpoint, () =>
    getRequests(getToken)
  );
};
