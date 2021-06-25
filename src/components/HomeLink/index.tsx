import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export const HomeLink = () => {
  return (
    <Link className={styles.link} to="/">
      Home
    </Link>
  );
};
