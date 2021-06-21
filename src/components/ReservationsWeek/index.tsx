import { ReservationsDay } from "../ReservationsDay";
import { ReservationsWeekProps } from "./types";

export const ReservationsWeek = ({
  reservationEdits,
  days,
  shortLeadTimeSpaces,
  users,
  onChange,
}: ReservationsWeekProps) => {
  return (
    <tr>
      {days.map((day) => (
        <ReservationsDay
          key={day.localDate}
          reservationEdits={reservationEdits}
          day={day}
          shortLeadTimeSpaces={shortLeadTimeSpaces}
          users={users}
          onChange={onChange}
        />
      ))}
    </tr>
  );
};
