import { Link } from "react-router-dom";
import { HeaderLinkProps } from "./types";

export const HeaderLink = ({ to, caption }: HeaderLinkProps) => {
  return (
    <Link className="navbar-brand" to={to}>
      {caption}
    </Link>
  );
};
