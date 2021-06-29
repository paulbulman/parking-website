import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../../../context/auth";
import { patch } from "../../helpers";
import {
  EditReservationsRequestBody,
  EditReservationsRequestError,
  EditReservationsRequestResult,
} from "./types";

export const useEditReservations = () => {
  const endpoint = "reservations";
  const queryClient = useQueryClient();
  const { getToken } = useAuthContext();

  const mutation = useMutation<
    EditReservationsRequestResult,
    EditReservationsRequestError,
    EditReservationsRequestBody
  >(endpoint, patch(getToken, endpoint), {
    onSuccess: (data) => {
      queryClient.setQueryData(endpoint, data);
    },
  });
  const { mutateAsync: editReservations, isLoading: isSaving } = mutation;
  return { editReservations, isSaving };
};
