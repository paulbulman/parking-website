import axios from "axios";
import { useMutation } from "react-query";
import { useAuthContext } from "../../../context/auth";
import type {
  AddUserRequestParameters,
  AddUserRequestError,
  AddUserRequestResult,
} from "./types";

const endpoint = "users";

const post =
  (getToken: () => Promise<string>) =>
  async (postData: AddUserRequestParameters) => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const token = await getToken();
    const { data } = await axios.post<AddUserRequestResult>(
      `${baseUrl}/${endpoint}`,
      postData,
      { headers: { Authorization: "Bearer " + token } }
    );
    return data;
  };

export const useAddUser = () => {
  const { getToken } = useAuthContext();
  const mutation = useMutation<
    AddUserRequestResult,
    AddUserRequestError,
    AddUserRequestParameters
  >(endpoint, post(getToken));
  return { addUser: mutation.mutateAsync };
};
