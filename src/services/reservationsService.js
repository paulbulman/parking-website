import moment from "moment";
import { getReservations, updateReservations } from "../api/reservationsApi";

export const getReservationsData = async () => {
  const rawData = await getReservations();

  return rawData.map(r => ({
    date: moment(r.date, "YYYY-MM-DD"),
    reservations: r.reservations
  }));
};

export const updateReservationsData = async reservationsData => {
  const rawData = reservationsData.map(r => ({
    date: r.date.format("YYYY-MM-DD"),
    reservations: r.reservations
  }));
  
  return await updateReservations(rawData);
};
