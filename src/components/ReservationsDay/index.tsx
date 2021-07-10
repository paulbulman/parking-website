import { format } from "date-fns";
import { ReservationsDayProps } from "./types";
import { getCurrentValue, createNewValue } from "./utils";

export const ReservationsDay = ({
  reservationEdits,
  day,
  shortLeadTimeSpaces,
  users,
  onChange,
}: ReservationsDayProps) => {
  const selectedUserIds = getCurrentValue(
    day.localDate,
    day.data?.userIds,
    shortLeadTimeSpaces,
    reservationEdits
  );

  const handleChange = (updatedIndex: number, updatedUserId: string) => {
    const reservationEdit = {
      localDate: day.localDate,
      userIds: createNewValue(selectedUserIds, updatedIndex, updatedUserId),
    };
    onChange(reservationEdit);
  };

  const createSelects = (
    selectedUserIds: string[],
    shortLeadTimeSpaces: number,
    users: ReservationsDayProps["users"]
  ) => {
    return [...Array(shortLeadTimeSpaces).keys()].map((index) => (
      <div key={index} className="field">
        <div className="select is-small is-fullwidth" key={index}>
          <select
            value={selectedUserIds[index]}
            onChange={(event) => handleChange(index, event.target.value)}
            title={`Reservation ${index + 1}`}
          >
            <option value="">Select</option>
            {users.map((u) => (
              <option key={u.userId} value={u.userId}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    ));
  };

  return day.hidden ? (
    <td></td>
  ) : (
    <td>
      <div className="has-text-weight-bold pb-2">
        {format(new Date(day.localDate), "dd MMM")}
      </div>
      {day.data && createSelects(selectedUserIds, shortLeadTimeSpaces, users)}
    </td>
  );
};
