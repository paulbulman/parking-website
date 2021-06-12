import { OverviewDay } from "../OverviewDay";
import { OverviewWeekProps } from "./types";

export const OverviewWeek = ({ days }: OverviewWeekProps) => {
  return (
    <tr>
      {days.map((day) => (
        <OverviewDay key={day.localDate} day={day} />
      ))}
    </tr>
  );
};
