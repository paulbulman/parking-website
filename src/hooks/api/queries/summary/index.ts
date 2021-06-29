import { useQuery } from "react-query";
import { useAuthContext } from "../../../context/auth";
import { get } from "../../helpers";
import { SummaryRequestError, SummaryRequestResult } from "./types";

export const useSummary = () => {
  const endpoint = "summary";

  const { getToken } = useAuthContext();

  return useQuery<SummaryRequestResult, SummaryRequestError>(endpoint, () =>
    get<SummaryRequestResult>(getToken, endpoint)
  );
};
