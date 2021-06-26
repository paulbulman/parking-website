import { SummaryDay } from "../SummaryDay";
import { SummaryWeekProps } from "./types";

export const SummaryWeek = ({ days }: SummaryWeekProps) => {
  return (
    <tr>
      {days.map((day) => (
        <SummaryDay key={day.localDate} day={day} />
      ))}
    </tr>
  );
};
