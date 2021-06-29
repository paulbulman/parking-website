import { useQuery } from "react-query";
import { useAuthContext } from "../../../context/auth";
import { get } from "../../helpers";
import { ReservationsRequestError, ReservationsRequestResult } from "./types";

export const useReservations = () => {
  const endpoint = "reservations";

  const { getToken } = useAuthContext();

  return useQuery<ReservationsRequestResult, ReservationsRequestError>(
    endpoint,
    () => get<ReservationsRequestResult>(getToken, endpoint)
  );
};
