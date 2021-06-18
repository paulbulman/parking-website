import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../../../context/auth";
import type {
  EditRequestsRequestBody,
  EditRequestsRequestError,
  EditRequestsRequestResult,
} from "./types";

const endpoint = "requests";

const patch =
  (getToken: () => Promise<string>) =>
  async (patchData: EditRequestsRequestBody) => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const token = await getToken();
    const { data } = await axios.patch<EditRequestsRequestResult>(
      `${baseUrl}/${endpoint}`,
      patchData,
      { headers: { Authorization: "Bearer " + token } }
    );
    return data;
  };

export const useEditRequests = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuthContext();

  const mutation = useMutation<
    EditRequestsRequestResult,
    EditRequestsRequestError,
    EditRequestsRequestBody
  >(endpoint, patch(getToken), {
    onSuccess: (data) => {
      queryClient.setQueryData([endpoint], data);
    },
  });
  const { mutateAsync: editRequests, isLoading: isSaving } = mutation;
  return { editRequests, isSaving };
};
