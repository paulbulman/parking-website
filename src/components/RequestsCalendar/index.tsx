import { RequestsWeek } from "../RequestsWeek";
import type { RequestsCalendarProps } from "./types";

export const RequestsCalendar = ({
  weeks,
  requestEdits,
  onChange,
}: RequestsCalendarProps) => {
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
          <RequestsWeek
            key={week.days[0].localDate}
            days={week.days}
            requestEdits={requestEdits}
            onChange={onChange}
          />
        ))}
      </tbody>
    </table>
  );
};
