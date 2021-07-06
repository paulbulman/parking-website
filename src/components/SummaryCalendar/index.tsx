import { Table } from "../Table";
import { SummaryWeek } from "../SummaryWeek";
import { SummaryCalendarProps } from "./types";

export const SummaryCalendar = ({ weeks }: SummaryCalendarProps) => {
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
          <SummaryWeek key={week.days[0].localDate} days={week.days} />
        ))}
      </tbody>
    </Table>
  );
};
