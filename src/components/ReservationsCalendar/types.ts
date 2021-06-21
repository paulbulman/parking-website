import { ReservationsRequestResult } from "../../hooks/api/queries/reservations/types";
import { ReservationEdit } from "../../pages/EditReservations/types";

export interface ReservationsCalendarProps {
  reservationEdits: ReservationEdit[];
  weeks: ReservationsRequestResult["reservations"]["weeks"];
  shortLeadTimeSpaces: ReservationsRequestResult["shortLeadTimeSpaces"];
  users: ReservationsRequestResult["users"];
  onChange: (reservationEdit: ReservationEdit) => void;
}
