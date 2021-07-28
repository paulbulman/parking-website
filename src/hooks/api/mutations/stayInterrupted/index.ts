import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../../../context/auth";
import { patch } from "../../helpers";
import {
  StayInterruptedRequestBody,
  StayInterruptedRequestError,
  StayInterruptedRequestResult,
} from "./types";

export const useStayInterrupted = () => {
  const endpoint = "stayInterrupted";
  const queryClient = useQueryClient();
  const { getToken } = useAuthContext();

  const mutation = useMutation<
    StayInterruptedRequestResult,
    StayInterruptedRequestError,
    StayInterruptedRequestBody
  >(endpoint, patch(getToken, endpoint), {
    onSuccess: (data) => {
      queryClient.setQueryData("dailyDetails", data);
    },
  });
  const { mutateAsync: stayInterrupted, isLoading: isSaving } = mutation;
  return { stayInterrupted, isSaving };
};
