import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../../../context/auth";
import { patch } from "../../helpers";
import {
  EditUserRequestsRequestParameters,
  EditUserRequestsRequestBody,
  EditUserRequestsRequestResult,
} from "./types";

export const useEditUserRequests = ({
  userId,
}: EditUserRequestsRequestParameters) => {
  const endpoint = "requests";
  const queryClient = useQueryClient();
  const { getToken } = useAuthContext();

  const mutation = useMutation<
    EditUserRequestsRequestResult,
    Error,
    EditUserRequestsRequestBody
  >([endpoint, userId], patch(getToken, `${endpoint}/${userId}`), {
    onSuccess: (data) => {
      queryClient.setQueryData([endpoint, userId], data);
    },
  });
  const { mutateAsync: editUserRequests, isLoading: isSaving } = mutation;
  return { editUserRequests, isSaving };
};
