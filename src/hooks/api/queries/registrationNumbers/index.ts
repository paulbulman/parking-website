import axios from "axios";
import { useQuery } from "react-query";
import { useAuthContext } from "../../../context/auth";
import {
  RegistrationNumbersRequestError,
  RegistrationNumbersRequestResult,
} from "./types";

const endpoint = "registrationNumbers";

const getRegistrationNumbers = async (getToken: () => Promise<string>) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const token = await getToken();
  const { data } = await axios.get<RegistrationNumbersRequestResult>(
    `${baseUrl}/${endpoint}`,
    { headers: { Authorization: "Bearer " + token } }
  );
  return data;
};

export const useRegistrationNumbers = () => {
  const { getToken } = useAuthContext();
  return useQuery<
    RegistrationNumbersRequestResult,
    RegistrationNumbersRequestError
  >(endpoint, () => getRegistrationNumbers(getToken));
};
