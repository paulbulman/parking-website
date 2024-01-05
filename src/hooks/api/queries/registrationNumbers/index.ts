import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../context/auth";
import { get } from "../../helpers";
import {
  RegistrationNumbersRequestResult,
  RegistrationNumbersRequestParameters,
} from "./types";

export const useRegistrationNumbers = ({
  searchString,
}: RegistrationNumbersRequestParameters) => {
  const endpoint = "registrationNumbers";
  const sanitizedSearchString = searchString.replace(/[^a-z0-9]/gi, "");

  const { getToken } = useAuthContext();

  return useQuery({
    queryKey: [endpoint, sanitizedSearchString],

    queryFn: () =>
      get<RegistrationNumbersRequestResult>(
        getToken,
        `${endpoint}/${sanitizedSearchString}`
      ),

    enabled: Boolean(sanitizedSearchString),
  });
};
