import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../context/auth";
import { get } from "../../helpers";
import {
  UserRequestsRequestResult,
  UserRequestsRequestParameters,
} from "./types";

export const useUserRequests = ({ userId }: UserRequestsRequestParameters) => {
  const endpoint = "requests";

  const { getToken } = useAuthContext();

  return useQuery({
    queryKey: [endpoint, userId],
    queryFn: () => get<UserRequestsRequestResult>(getToken, `${endpoint}/${userId}`),
    enabled: Boolean(userId)
  });
};
