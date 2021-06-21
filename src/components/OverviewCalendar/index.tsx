import { OverviewWeek } from "../OverviewWeek";
import { OverviewCalendarProps } from "./types";

export const OverviewCalendar = ({ weeks }: OverviewCalendarProps) => {
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
          <OverviewWeek key={week.days[0].localDate} days={week.days} />
        ))}
      </tbody>
    </table>
  );
};
