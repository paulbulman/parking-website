import { LogoutButtonProps } from "./types";

export const LogoutButton = ({ onClick }: LogoutButtonProps) => {
  return (
    <button onClick={onClick} className="nav-link btn btn-link text-dark">
      Log out
    </button>
  );
};
