import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../../../context/auth";
import { patch } from "../../helpers";
import { EditRequestsRequestBody, EditRequestsRequestResult } from "./types";

export const useEditRequests = () => {
  const endpoint = "requests";
  const queryClient = useQueryClient();
  const { getToken } = useAuthContext();

  const mutation = useMutation<
    EditRequestsRequestResult,
    Error,
    EditRequestsRequestBody
  >({
    mutationFn: patch(getToken, endpoint),
    onSuccess: (data) => {
      queryClient.setQueryData([endpoint], data);
    },
  });
  const { mutateAsync: editRequests, isPending: isSaving } = mutation;
  return { editRequests, isSaving };
};
