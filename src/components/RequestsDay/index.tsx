import { format } from "date-fns";
import { RequestsDayProps } from "./types";
import { getCurrentValue } from "./utils";

export const RequestsDay = ({
  day,
  requestEdits,
  onChange,
}: RequestsDayProps) => {
  const checked = getCurrentValue(
    day.localDate,
    Boolean(day.data?.requested),
    requestEdits
  );
  return day.hidden ? (
    <td></td>
  ) : (
    <td>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={() =>
            onChange({ localDate: day.localDate, requested: !checked })
          }
        />{" "}
        {format(new Date(day.localDate), "dd MMM")}
      </label>
    </td>
  );
};
