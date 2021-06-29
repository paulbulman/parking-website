import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../../../context/auth";
import { post } from "../../helpers";
import {
  AddUserRequestBody,
  AddUserRequestError,
  AddUserRequestResult,
} from "./types";

export const useAddUser = () => {
  const endpoint = "users";
  const queryClient = useQueryClient();
  const { getToken } = useAuthContext();
  const mutation = useMutation<
    AddUserRequestResult,
    AddUserRequestError,
    AddUserRequestBody
  >(post(getToken, endpoint), {
    onSuccess: () => {
      queryClient.invalidateQueries("registrationNumbers");
    },
  });
  return { addUser: mutation.mutateAsync };
};
