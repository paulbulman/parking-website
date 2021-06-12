import axios from "axios";
import { useQuery } from "react-query";
import { useAuthContext } from "../../../context/auth";
import { OverviewRequestError, OverviewRequestResult } from "./types";

const endpoint = "overview";

const getOverview = async (getToken: () => Promise<string>) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const token = await getToken();
  const { data } = await axios.get<OverviewRequestResult>(
    `${baseUrl}/${endpoint}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return data;
};

export const useOverview = () => {
  const { getToken } = useAuthContext();
  return useQuery<OverviewRequestResult, OverviewRequestError>(endpoint, () =>
    getOverview(getToken)
  );
};
