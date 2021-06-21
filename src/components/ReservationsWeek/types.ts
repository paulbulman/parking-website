import { ReservationsRequestResult } from "../../hooks/api/queries/reservations/types";
import { ReservationEdit } from "../../pages/EditReservations/types";

export interface ReservationsWeekProps {
  reservationEdits: ReservationEdit[];
  days: ReservationsRequestResult["reservations"]["weeks"][0]["days"];
  shortLeadTimeSpaces: ReservationsRequestResult["shortLeadTimeSpaces"];
  users: ReservationsRequestResult["users"];
  onChange: (reservationEdit: ReservationEdit) => void;
}
