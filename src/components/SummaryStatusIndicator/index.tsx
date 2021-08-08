import classNames from "classnames";
import { SummaryStatusIndicatorProps } from "./types";
import styles from "./styles.module.css";

export const SummaryStatusIndicator = ({
  status,
}: SummaryStatusIndicatorProps) => {
  if (!status) {
    return null;
  }

  const indicatorClasses = classNames({
    "is-hidden-mobile": true,
    "mr-2": true,
    [styles.circle]: true,
    [styles.allocated]: status === "allocated",
    [styles.interrupted]:
      status === "interrupted" || status === "hardInterrupted",
    [styles.pending]: status === "pending",
  });
  return <figure className={indicatorClasses}></figure>;
};
