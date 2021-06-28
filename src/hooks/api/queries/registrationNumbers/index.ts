import { useQuery } from "react-query";
import { useAuthContext } from "../../../context/auth";
import { get } from "../helpers";
import {
  RegistrationNumbersRequestError,
  RegistrationNumbersRequestResult,
} from "./types";

export const useRegistrationNumbers = () => {
  const endpoint = "registrationNumbers";

  const { getToken } = useAuthContext();

  return useQuery<
    RegistrationNumbersRequestResult,
    RegistrationNumbersRequestError
  >(endpoint, () => get<RegistrationNumbersRequestResult>(getToken, endpoint));
};
