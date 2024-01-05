import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../context/auth";
import { get } from "../../helpers";
import { ReservationsRequestResult } from "./types";

export const useReservations = () => {
  const endpoint = "reservations";

  const { getToken } = useAuthContext();

  return useQuery({
    queryKey: [endpoint],
    queryFn: () => get<ReservationsRequestResult>(getToken, endpoint),
  });
};
