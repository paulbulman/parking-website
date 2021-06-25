import { LogoutButtonProps } from "./types";
import styles from "./styles.module.css";

export const LogoutButton = ({ onClick }: LogoutButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      Log out
    </button>
  );
};
