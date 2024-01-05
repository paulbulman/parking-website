import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../context/auth";
import { get } from "../../helpers";
import { RequestsRequestResult } from "./types";

export const useRequests = () => {
  const endpoint = "requests";

  const { getToken } = useAuthContext();

  return useQuery({
    queryKey: [endpoint],

    queryFn: () => get<RequestsRequestResult>(getToken, endpoint),
  });
};
