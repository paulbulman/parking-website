import { operations } from "../../types";

export type ReservationsRequestResult =
  operations["Reservations_Get"]["responses"]["200"]["content"]["application/json"];
export type ReservationsRequestError = Error | null;
