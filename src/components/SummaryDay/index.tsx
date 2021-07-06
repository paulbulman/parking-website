import { format } from "date-fns";
import classNames from "classnames";
import { SummaryDayProps } from "./types";

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
      "has-text-success-dark": status === "allocated",
      "has-text-danger": status === "interrupted",
      "has-text-grey-light": status === "requested",
    });
  };

  return day.hidden ? (
    <td></td>
  ) : (
    <td>
      <div className="has-text-weight-bold">
        {format(new Date(day.localDate), "dd MMM")}
      </div>
      <div className={getStatusClass(day.data?.status)}>
        {getStatusCaption(day.data?.status)}
      </div>
    </td>
  );
};
