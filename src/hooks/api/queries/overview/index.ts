import { useQuery } from "react-query";
import { useAuthContext } from "../../../context/auth";
import { get } from "../../helpers";
import { OverviewRequestError, OverviewRequestResult } from "./types";

export const useOverview = () => {
  const endpoint = "overview";
  
  const { getToken } = useAuthContext();

  return useQuery<OverviewRequestResult, OverviewRequestError>(endpoint, () =>
    get<OverviewRequestResult>(getToken, endpoint)
  );
};
