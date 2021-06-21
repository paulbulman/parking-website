import axios from "axios";
import { useQuery } from "react-query";
import { useAuthContext } from "../../../context/auth";
import { ProfileRequestError, ProfileRequestResult } from "./types";

const endpoint = "profiles";

const getProfile = async (getToken: () => Promise<string>) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const token = await getToken();
  const { data } = await axios.get<ProfileRequestResult>(
    `${baseUrl}/${endpoint}`,
    { headers: { Authorization: "Bearer " + token } }
  );
  return data;
};

export const useProfile = () => {
  const { getToken } = useAuthContext();
  return useQuery<ProfileRequestResult, ProfileRequestError>(endpoint, () =>
    getProfile(getToken)
  );
};
