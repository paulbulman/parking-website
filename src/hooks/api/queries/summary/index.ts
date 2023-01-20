import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../context/auth";
import { get } from "../../helpers";
import { SummaryRequestResult } from "./types";

export const useSummary = () => {
  const endpoint = "summary";

  const { getToken } = useAuthContext();

  return useQuery<SummaryRequestResult, Error>([endpoint], () =>
    get<SummaryRequestResult>(getToken, endpoint)
  );
};
