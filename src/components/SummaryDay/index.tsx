import { format } from "date-fns";
import classNames from "classnames";
import { SummaryDayProps } from "./types";
import { Link } from "react-router-dom";

export const SummaryDay = ({ day }: SummaryDayProps) => {
  const getStatusCaption = (status: string | null | undefined) => {
    switch (status) {
      case "allocated":
        return "Allocated";
      case "interrupted":
        return "Interrupted";
      case "hardInterrupted":
        return "Stay interrupted";
      case "pending":
        return "Pending";
      default:
        return "\u00A0";
    }
  };

  const getStatusClass = (status: string | null | undefined) => {
    return classNames({
      "has-text-success-dark": status === "allocated",
      "has-text-danger":
        status === "interrupted" || status === "hardInterrupted",
      "has-text-grey-light": status === "pending",
    });
  };

  return day.hidden ? (
    <td></td>
  ) : (
    <td>
      <div>
        <Link
          className="has-text-weight-bold has-text-dark"
          to={`/daily-details?localDate=${day.localDate}`}
        >
          {format(new Date(day.localDate), "dd MMM")}
        </Link>
      </div>
      <div className={getStatusClass(day.data?.status)}>
        {getStatusCaption(day.data?.status)}
      </div>
    </td>
  );
};
