import { HeaderProps } from "./types";
import styles from "./styles.module.css";

export const Header = ({ children }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>{children}</nav>
      </div>
    </header>
  );
};
