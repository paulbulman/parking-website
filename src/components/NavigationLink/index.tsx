import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavigationLinkProps } from "./types";

export const NavigationLink = ({ to, caption, icon }: NavigationLinkProps) => {
  const isHome = to === "/";
  return (
    <NavLink
      activeClassName="is-active"
      exact={isHome}
      className="navbar-item is-tab"
      to={to}
    >
      <span className="mr-2">
        <FontAwesomeIcon icon={icon} />
      </span>
      {caption}
    </NavLink>
  );
};
