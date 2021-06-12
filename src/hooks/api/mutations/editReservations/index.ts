import axios from "axios";
import { useMutation } from "react-query";
import { useAuthContext } from "../../../context/auth";
import type {
  EditReservationsRequestParameters,
  EditReservationsRequestError,
  EditReservationsRequestResult,
} from "./types";

const endpoint = "reservations";

const patch =
  (getToken: () => Promise<string>) =>
  async (patchData: EditReservationsRequestParameters) => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const token = await getToken();
    const { data } = await axios.patch<EditReservationsRequestResult>(
      `${baseUrl}/${endpoint}`,
      patchData,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return data;
  };

export const useEditReservations = () => {
  const { getToken } = useAuthContext();
  const mutation = useMutation<
    EditReservationsRequestResult,
    EditReservationsRequestError,
    EditReservationsRequestParameters
  >(endpoint, patch(getToken));
  const { mutateAsync: editReservations, isLoading: isSaving } = mutation;
  return { editReservations, isSaving };
};
