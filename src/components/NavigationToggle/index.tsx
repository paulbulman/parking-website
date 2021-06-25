import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { NavigationToggleProps } from "./types";
import styles from "./styles.module.css";

export const NavigationToggle = ({
  onClick,
  expanded,
}: NavigationToggleProps) => {
  const icon = expanded ? faWindowClose : faBars;
  const title = expanded ? "Close navigation" : "Open navigation";

  return (
    <button className={styles.toggleButton} onClick={onClick}>
      <FontAwesomeIcon icon={icon} title={title} />
    </button>
  );
};
