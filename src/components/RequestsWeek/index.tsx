import { RequestsDay } from "../RequestsDay";
import type { RequestsWeekProps } from "./types";

export const RequestsWeek = ({
  days,
  requestEdits,
  onChange,
}: RequestsWeekProps) => {
  return (
    <tr>
      {days.map((day) => (
        <RequestsDay
          key={day.localDate}
          requestEdits={requestEdits}
          day={day}
          onChange={onChange}
        />
      ))}
    </tr>
  );
};
