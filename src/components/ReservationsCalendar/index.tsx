import { ReservationsWeek } from "../ReservationsWeek";
import { ReservationsCalendarProps } from "./types";

export const ReservationsCalendar = ({
  reservationEdits,
  weeks,
  shortLeadTimeSpaces,
  users,
  onChange,
}: ReservationsCalendarProps) => {
  return (
    <table className="table table-top table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
        </tr>
      </thead>
      <tbody>
        {weeks.map((week) => (
          <ReservationsWeek
            key={week.days[0].localDate}
            reservationEdits={reservationEdits}
            days={week.days}
            shortLeadTimeSpaces={shortLeadTimeSpaces}
            users={users}
            onChange={onChange}
          />
        ))}
      </tbody>
    </table>
  );
};
