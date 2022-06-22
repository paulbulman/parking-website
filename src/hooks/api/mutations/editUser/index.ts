import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../../../context/auth";
import { patch } from "../../helpers";
import {
  EditUserRequestParameters,
  EditUserRequestBody,
  EditUserRequestResult,
} from "./types";

export const useEditUser = ({ userId }: EditUserRequestParameters) => {
  const endpoint = "users";
  const queryClient = useQueryClient();
  const { getToken } = useAuthContext();

  const mutation = useMutation<
    EditUserRequestResult,
    Error,
    EditUserRequestBody
  >([endpoint, userId], patch(getToken, `${endpoint}/${userId}`), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("registrationNumbers");
      queryClient.setQueryData([endpoint, userId], data);
    },
  });
  return { editUser: mutation.mutateAsync };
};
