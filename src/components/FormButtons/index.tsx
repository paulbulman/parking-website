import styles from "./styles.module.css";
import { FormButtonsProps } from "./types";

export const FormButtons = ({ isSubmitting, onCancel }: FormButtonsProps) => {
  return (
    <div className={styles.buttons}>
      <button
        type="submit"
        className="btn btn-outline-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving" : "Save"}
      </button>
      <button
        type="button"
        className="btn btn-outline-secondary"
        disabled={isSubmitting}
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
};
