import { ReservationsRequestResult } from "../../hooks/api/queries/reservations/types";
import { ReservationEdit } from "../../pages/EditReservations/types";

export interface ReservationsDayProps {
  reservationEdits: ReservationEdit[];
  day: ReservationsRequestResult["reservations"]["weeks"][0]["days"][0];
  shortLeadTimeSpaces: ReservationsRequestResult["shortLeadTimeSpaces"];
  users: ReservationsRequestResult["users"];
  onChange: (reservationEdit: ReservationEdit) => void;
}
