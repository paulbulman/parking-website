import type { ReservationsRequestResult } from "../../hooks/api/queries/reservations/types";
import type { ReservationEdit } from "../../pages/EditReservations/types";

export interface ReservationsCalendarProps {
  reservationEdits: ReservationEdit[];
  weeks: ReservationsRequestResult["reservations"]["weeks"];
  shortLeadTimeSpaces: ReservationsRequestResult["shortLeadTimeSpaces"];
  users: ReservationsRequestResult["users"];
  onChange: (reservationEdit: ReservationEdit) => void;
}
