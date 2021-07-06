import classNames from "classnames";
import { NavigationToggleProps } from "./types";

export const NavigationToggle = ({
  onClick,
  expanded,
}: NavigationToggleProps) => {
  var buttonClasses = classNames({
    "navbar-burger": true,
    "is-active": expanded,
  });

  return (
    <button
      className={buttonClasses}
      aria-label="menu"
      aria-expanded={expanded}
      onClick={onClick}
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </button>
  );
};
