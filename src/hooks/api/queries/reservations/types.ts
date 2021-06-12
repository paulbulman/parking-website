import { UseQueryOptions } from "react-query";
import type { operations } from "../../types";

export type ReservationsRequestParameters = never;
export type ReservationsRequestResult =
  operations["Reservations_Get"]["responses"]["200"]["content"]["application/json"];
export type ReservationsRequestError = Error | null;

export interface UseReservationsParameters {
  parameters?: ReservationsRequestParameters;
  options?: UseQueryOptions<
    ReservationsRequestResult,
    ReservationsRequestError
  >;
}
