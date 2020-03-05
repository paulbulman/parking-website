import moment from "moment";
import { getUserIdToken } from "./authenticationService";
import { get, post } from "../api/apiHelpers";

export const getReservationsData = async () => {
  const token = await getUserIdToken();
  const rawData = await get("reservations", token);

  return rawData.map(r => ({
    date: moment(r.date, "YYYY-MM-DD"),
    reservations: r.reservations
  }));
};

export const updateReservationsData = async reservationsData => {
  const token = await getUserIdToken();
  return await post("reservations", reservationsData, token);
};
