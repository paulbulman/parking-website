import { format } from "date-fns";
import classNames from "classnames";
import { OverviewDayProps } from "./types";

export const OverviewDay = ({ day }: OverviewDayProps) => {
  const createListItem = (user: { name: string; isHighlighted: boolean }) => {
    var userClasses = classNames({
      "has-text-weight-bold": user.isHighlighted,
    });
    return (
      <li key={user.name} className={userClasses}>
        {user.name}
      </li>
    );
  };

  return day.hidden ? (
    <td></td>
  ) : (
    <td>
      <div className="has-text-weight-bold">
        {format(new Date(day.localDate), "dd MMM")}
      </div>
      <ul className="has-text-success-dark pt-2">
        {day.data?.allocatedUsers.map((user) => createListItem(user))}
      </ul>
      <ul className="has-text-danger pt-2">
        {day.data?.interruptedUsers.map((user) => createListItem(user))}
      </ul>
    </td>
  );
};
