import classNames from "classnames";
import { NavigationSectionProps } from "./types";
import styles from "./styles.module.css";

export const NavigationSection = ({
  expanded,
  children,
}: NavigationSectionProps) => {
  var listClasses = classNames({
    [styles.list]: true,
    [styles.expanded]: expanded,
  });
  return <ul className={listClasses}>{children}</ul>;
};
