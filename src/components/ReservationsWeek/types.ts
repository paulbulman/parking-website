import type { ReservationsRequestResult } from "../../hooks/api/queries/reservations/types";
import type { ReservationEdit } from "../../pages/EditReservations/types";

export interface ReservationsWeekProps {
  reservationEdits: ReservationEdit[];
  days: ReservationsRequestResult["reservations"]["weeks"][0]["days"];
  shortLeadTimeSpaces: ReservationsRequestResult["shortLeadTimeSpaces"];
  users: ReservationsRequestResult["users"];
  onChange: (reservationEdit: ReservationEdit) => void;
}
