import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../context/auth";
import { get } from "../../helpers";
import { SummaryRequestResult } from "./types";

export const useSummary = () => {
  const endpoint = "summary";

  const { getToken } = useAuthContext();

  return useQuery({
    queryKey: [endpoint],

    queryFn: () =>
      get<SummaryRequestResult>(getToken, endpoint)
  });
};
