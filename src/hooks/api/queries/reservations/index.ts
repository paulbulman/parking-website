import axios from "axios";
import { useQuery } from "react-query";
import { useAuthContext } from "../../../context/auth";
import type {
  ReservationsRequestError,
  ReservationsRequestResult,
} from "./types";

const endpoint = "reservations";

const getReservations = async (getToken: () => Promise<string>) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const token = await getToken();
  const { data } = await axios.get<ReservationsRequestResult>(
    `${baseUrl}/${endpoint}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return data;
};

export const useReservations = () => {
  const { getToken } = useAuthContext();
  return useQuery<ReservationsRequestResult, ReservationsRequestError>(
    endpoint,
    () => getReservations(getToken)
  );
};
