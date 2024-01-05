import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../context/auth";
import { get } from "../../helpers";
import { OverviewRequestResult } from "./types";

export const useOverview = () => {
  const endpoint = "overview";

  const { getToken } = useAuthContext();

  return useQuery({
    queryKey: [endpoint],

    queryFn: () => get<OverviewRequestResult>(getToken, endpoint),
  });
};
