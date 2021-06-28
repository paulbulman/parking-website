import { useQuery } from "react-query";
import { useAuthContext } from "../../../context/auth";
import { get } from "../helpers";
import { ProfileRequestError, ProfileRequestResult } from "./types";

export const useProfile = () => {
  const endpoint = "profiles";

  const { getToken } = useAuthContext();

  return useQuery<ProfileRequestResult, ProfileRequestError>(endpoint, () =>
    get<ProfileRequestResult>(getToken, endpoint)
  );
};
