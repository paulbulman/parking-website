import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../../../context/auth";
import { patch } from "../../helpers";
import {
  EditRequestsRequestBody,
  EditRequestsRequestError,
  EditRequestsRequestResult,
} from "./types";

export const useEditRequests = () => {
  const endpoint = "requests";
  const queryClient = useQueryClient();
  const { getToken } = useAuthContext();

  const mutation = useMutation<
    EditRequestsRequestResult,
    EditRequestsRequestError,
    EditRequestsRequestBody
  >(endpoint, patch(getToken, endpoint), {
    onSuccess: (data) => {
      queryClient.setQueryData(endpoint, data);
    },
  });
  const { mutateAsync: editRequests, isLoading: isSaving } = mutation;
  return { editRequests, isSaving };
};
