import { useMutation } from "react-query";
import { useAuthContext } from "../../../context/auth";
import { httpDelete } from "../../helpers";
import { DeleteUserRequestParameters, DeleteUserRequestResult } from "./types";

export const useDeleteUser = () => {
  const endpoint = "users";
  const { getToken } = useAuthContext();

  const mutation = useMutation<
    DeleteUserRequestResult,
    Error,
    DeleteUserRequestParameters
  >(({ userId }) => httpDelete(getToken, `${endpoint}/${userId}`));

  const { mutateAsync: deleteUser, isLoading: isDeleting } = mutation;

  return { deleteUser, isDeleting };
};
