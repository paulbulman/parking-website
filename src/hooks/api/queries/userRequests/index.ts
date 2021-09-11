import { useQuery } from "react-query";
import { useAuthContext } from "../../../context/auth";
import { get } from "../../helpers";
import {
  UserRequestsRequestError,
  UserRequestsRequestResult,
  UserRequestsRequestParameters,
} from "./types";

export const useUserRequests = ({ userId }: UserRequestsRequestParameters) => {
  const endpoint = "requests";

  const { getToken } = useAuthContext();

  return useQuery<UserRequestsRequestResult, UserRequestsRequestError>(
    [endpoint, userId],
    () => get<UserRequestsRequestResult>(getToken, `${endpoint}/${userId}`),
    {
      enabled: Boolean(userId),
    }
  );
};
