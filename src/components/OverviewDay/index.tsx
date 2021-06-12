import { format } from "date-fns";
import classNames from "classnames";
import { OverviewDayProps } from "./types";
import styles from "./styles.module.css";

export const OverviewDay = ({ day }: OverviewDayProps) => {
  const createListItem = (user: { name: string; isHighlighted: boolean }) => {
    var userClasses = classNames({
      [styles.highlighted]: user.isHighlighted,
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
      <div className={styles.date}>
        {format(new Date(day.localDate), "dd MMM")}
      </div>
      <ul className={classNames(styles.userList, styles.allocated)}>
        {day.data?.allocatedUsers.map((user) => createListItem(user))}
      </ul>
      <ul className={classNames(styles.userList, styles.interrupted)}>
        {day.data?.interruptedUsers.map((user) => createListItem(user))}
      </ul>
    </td>
  );
};
