import { Link } from "react-router-dom";
import { NavigationLinkProps } from "./types";

export const NavigationLink = ({ to, caption }: NavigationLinkProps) => {
  return (
    <Link className="navbar-item" to={to}>
      {caption}
    </Link>
  );
};
