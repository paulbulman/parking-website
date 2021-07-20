import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { LogoutButtonProps } from "./types";

export const LogoutButton = ({ onClick }: LogoutButtonProps) => {
  return (
    <Link className="navbar-item is-tab" to="#" onClick={onClick}>
      <span className="mr-2">
        <FontAwesomeIcon icon={faSignOutAlt} />
      </span>
      Log out
    </Link>
  );
};
