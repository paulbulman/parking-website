import { FormButtonsProps } from "./types";

export const FormButtons = ({ isSubmitting, onCancel }: FormButtonsProps) => {
  return (
    <div className="field is-grouped">
      <div className="control">
        <button
          type="submit"
          className="button is-link"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving" : "Save"}
        </button>
      </div>
      <div className="control">
        <button
          type="button"
          className="button is-link is-light"
          disabled={isSubmitting}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
