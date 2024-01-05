import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../../../context/auth";
import { patch } from "../../helpers";
import {
  StayInterruptedRequestBody,
  StayInterruptedRequestResult,
} from "./types";

export const useStayInterrupted = () => {
  const endpoint = "stayInterrupted";
  const queryClient = useQueryClient();
  const { getToken } = useAuthContext();

  const mutation = useMutation<
    StayInterruptedRequestResult,
    Error,
    StayInterruptedRequestBody
  >({
    mutationFn: patch(getToken, endpoint),
    onSuccess: (data) => {
      queryClient.setQueryData(["dailyDetails"], data);
    },
  });
  const { mutateAsync: stayInterrupted, isPending: isSaving } = mutation;
  return { stayInterrupted, isSaving };
};
