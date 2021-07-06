import { Table } from "../Table";
import { RequestsWeek } from "../RequestsWeek";
import { RequestsCalendarProps } from "./types";

export const RequestsCalendar = ({
  weeks,
  requestEdits,
  onChange,
}: RequestsCalendarProps) => {
  return (
    <Table>
      <thead>
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
    </Table>
  );
};
