import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../../../context/auth";
import { patch } from "../../helpers";
import {
  EditProfileRequestBody,
  EditProfileRequestError,
  EditProfileRequestResult,
} from "./types";

export const useEditProfile = () => {
  const endpoint = "profiles";
  const queryClient = useQueryClient();
  const { getToken } = useAuthContext();

  const mutation = useMutation<
    EditProfileRequestResult,
    EditProfileRequestError,
    EditProfileRequestBody
  >(endpoint, patch(getToken, endpoint), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("registrationNumbers");
      queryClient.setQueryData(endpoint, data);
    },
  });
  const { mutateAsync: editProfile, isLoading: isSaving } = mutation;
  return { editProfile, isSaving };
};
