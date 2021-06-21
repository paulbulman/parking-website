import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../../../context/auth";
import {
  EditReservationsRequestBody,
  EditReservationsRequestError,
  EditReservationsRequestResult,
} from "./types";

const endpoint = "reservations";

const patch =
  (getToken: () => Promise<string>) =>
  async (patchData: EditReservationsRequestBody) => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const token = await getToken();
    const { data } = await axios.patch<EditReservationsRequestResult>(
      `${baseUrl}/${endpoint}`,
      patchData,
      { headers: { Authorization: "Bearer " + token } }
    );
    return data;
  };

export const useEditReservations = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuthContext();

  const mutation = useMutation<
    EditReservationsRequestResult,
    EditReservationsRequestError,
    EditReservationsRequestBody
  >(endpoint, patch(getToken), {
    onSuccess: (data) => {
      queryClient.setQueryData(endpoint, data);
    },
  });
  const { mutateAsync: editReservations, isLoading: isSaving } = mutation;
  return { editReservations, isSaving };
};
