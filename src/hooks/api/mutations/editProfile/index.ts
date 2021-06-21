import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../../../context/auth";
import {
  EditProfileRequestBody,
  EditProfileRequestError,
  EditProfileRequestResult,
} from "./types";

const endpoint = "profiles";

const patch =
  (getToken: () => Promise<string>) =>
  async (patchData: EditProfileRequestBody) => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const token = await getToken();
    const { data } = await axios.patch<EditProfileRequestResult>(
      `${baseUrl}/${endpoint}`,
      patchData,
      { headers: { Authorization: "Bearer " + token } }
    );
    return data;
  };

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuthContext();

  const mutation = useMutation<
    EditProfileRequestResult,
    EditProfileRequestError,
    EditProfileRequestBody
  >(endpoint, patch(getToken), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("registrationNumbers");
      queryClient.setQueryData(endpoint, data);
    },
  });
  const { mutateAsync: editProfile, isLoading: isSaving } = mutation;
  return { editProfile, isSaving };
};
