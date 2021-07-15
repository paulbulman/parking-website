import { FormSubmit } from "../FormSubmit";
import { FormButtonsProps } from "./types";

export const FormButtons = ({ isSubmitting, onCancel }: FormButtonsProps) => {
  return (
    <div className="field is-grouped">
      <FormSubmit isLoading={isSubmitting}>Save</FormSubmit>
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
