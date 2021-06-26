import { format } from "date-fns";
import classNames from "classnames";
import { SummaryDayProps } from "./types";
import styles from "./styles.module.css";

export const SummaryDay = ({ day }: SummaryDayProps) => {
  const getStatusCaption = (status: string | null | undefined) => {
    switch (status) {
      case "allocated":
        return "Allocated";
      case "interrupted":
        return "Interrupted";
      case "requested":
        return "Requested";
      default:
        return null;
    }
  };

  const getStatusClass = (status: string | null | undefined) => {
    return classNames({
      [styles.allocated]: status === "allocated",
      [styles.interrupted]: status === "interrupted",
      [styles.requested]: status === "requested",
    });
  };

  return day.hidden ? (
    <td></td>
  ) : (
    <td>
      <div className={styles.date}>
        {format(new Date(day.localDate), "dd MMM")}
      </div>
      <div className={getStatusClass(day.data?.status)}>
        {getStatusCaption(day.data?.status)}
      </div>
    </td>
  );
};
