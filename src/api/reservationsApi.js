import { get, post } from "./apiHelpers";

export const getReservations = async () => await get("reservations");

export const updateReservations = async reservationsData =>
  await post("reservations", reservationsData);
