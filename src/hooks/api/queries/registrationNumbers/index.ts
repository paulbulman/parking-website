import { useQuery } from "react-query";
import { useAuthContext } from "../../../context/auth";
import { get } from "../../helpers";
import {
  RegistrationNumbersRequestError,
  RegistrationNumbersRequestResult,
  RegistrationNumbersRequestParameters,
} from "./types";

export const useRegistrationNumbers = ({
  searchString,
}: RegistrationNumbersRequestParameters) => {
  const endpoint = "registrationNumbers";
  const sanitizedSearchString = searchString.replace(/[^a-z0-9]/gi, "");

  const { getToken } = useAuthContext();

  return useQuery<
    RegistrationNumbersRequestResult,
    RegistrationNumbersRequestError
  >(
    [endpoint, sanitizedSearchString],
    () =>
      get<RegistrationNumbersRequestResult>(
        getToken,
        `${endpoint}/${sanitizedSearchString}`
      ),
    {
      enabled: Boolean(sanitizedSearchString),
    }
  );
};
