import axios from "axios";
import { useQuery } from "react-query";
import { useAuthContext } from "../../../context/auth";
import { SummaryRequestError, SummaryRequestResult } from "./types";

const endpoint = "summary";

const getSummary = async (getToken: () => Promise<string>) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const token = await getToken();
  const { data } = await axios.get<SummaryRequestResult>(
    `${baseUrl}/${endpoint}`,
    { headers: { Authorization: "Bearer " + token } }
  );
  return data;
};

export const useSummary = () => {
  const { getToken } = useAuthContext();
  return useQuery<SummaryRequestResult, SummaryRequestError>(endpoint, () =>
    getSummary(getToken)
  );
};
