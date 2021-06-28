import { useQuery } from "react-query";
import { useAuthContext } from "../../../context/auth";
import { get } from "../helpers";
import { RequestsRequestError, RequestsRequestResult } from "./types";

export const useRequests = () => {
  const endpoint = "requests";

  const { getToken } = useAuthContext();

  return useQuery<RequestsRequestResult, RequestsRequestError>(endpoint, () =>
    get<RequestsRequestResult>(getToken, endpoint)
  );
};
