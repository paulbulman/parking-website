import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../../../context/auth";
import type {
  EditUserRequestParameters,
  EditUserRequestBody,
  EditUserRequestError,
  EditUserRequestResult,
} from "./types";

const endpoint = "users";

const patch =
  (userId: string, getToken: () => Promise<string>) =>
  async (patchData: EditUserRequestBody) => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const token = await getToken();
    const { data } = await axios.patch<EditUserRequestResult>(
      `${baseUrl}/${endpoint}/${userId}`,
      patchData,
      { headers: { Authorization: "Bearer " + token } }
    );
    return data;
  };

export const useEditUser = ({ userId }: EditUserRequestParameters) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuthContext();

  const mutation = useMutation<
    EditUserRequestResult,
    EditUserRequestError,
    EditUserRequestBody
  >([endpoint, userId], patch(userId, getToken), {
    onSuccess: (data) => {
      queryClient.setQueryData([endpoint, userId], data);
    },
  });
  return { editUser: mutation.mutateAsync };
};
