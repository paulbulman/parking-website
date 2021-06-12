import type { operations } from "../../types";

export type EditReservationsRequestParameters =
  operations["Reservations_Patch"]["requestBody"]["content"]["application/json"];
export type EditReservationsRequestResult =
  operations["Reservations_Patch"]["responses"]["200"]["content"]["application/json"];
export type EditReservationsRequestError = Error | null;
