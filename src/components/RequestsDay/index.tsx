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

  const handleChange = (updatedRequested: boolean) => {
    const requestEdit = {
      localDate: day.localDate,
      requested: updatedRequested,
    };
    onChange(requestEdit);
  };

  return day.hidden ? (
    <td></td>
  ) : (
    <td>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => handleChange(event.target.checked)}
        />{" "}
        {format(new Date(day.localDate), "dd MMM")}
      </label>
    </td>
  );
};
