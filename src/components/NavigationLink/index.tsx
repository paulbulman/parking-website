import { Link } from "react-router-dom";
import { NavigationLinkProps } from "./types";
import styles from "./styles.module.css";

export const NavigationLink = ({ to, caption }: NavigationLinkProps) => {
  return (
    <li className={styles.listItem}>
      <Link className={styles.link} to={to}>
        {caption}
      </Link>
    </li>
  );
};
