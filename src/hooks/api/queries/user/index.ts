import { useQuery } from "react-query";
import { useAuthContext } from "../../../context/auth";
import { get } from "../../helpers";
import { UserRequestResult, UserRequestParameters } from "./types";

export const useUser = ({ userId }: UserRequestParameters) => {
  const endpoint = "users";

  const { getToken } = useAuthContext();

  return useQuery<UserRequestResult, Error>([endpoint, userId], () =>
    get<UserRequestResult>(getToken, `${endpoint}/${userId}`)
  );
};
