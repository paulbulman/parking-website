import { Link } from "react-router-dom";
import { LogoutButtonProps } from "./types";

export const LogoutButton = ({ onClick }: LogoutButtonProps) => {
  return (
    <Link className="navbar-item" to="#" onClick={onClick}>
      Log out
    </Link>
  );
};
