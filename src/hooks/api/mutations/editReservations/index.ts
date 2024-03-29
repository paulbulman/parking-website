import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../../../context/auth";
import { patch } from "../../helpers";
import {
  EditReservationsRequestBody,
  EditReservationsRequestResult,
} from "./types";

export const useEditReservations = () => {
  const endpoint = "reservations";
  const queryClient = useQueryClient();
  const { getToken } = useAuthContext();

  const mutation = useMutation<
    EditReservationsRequestResult,
    Error,
    EditReservationsRequestBody
  >({
    mutationFn: patch(getToken, endpoint),
    onSuccess: (data) => {
      queryClient.setQueryData([endpoint], data);
    },
  });
  const { mutateAsync: editReservations, isPending: isSaving } = mutation;
  return { editReservations, isSaving };
};
