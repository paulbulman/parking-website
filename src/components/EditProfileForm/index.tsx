import { Formik, Field, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { EditProfileFormProps } from "./types";

export const EditProfileForm = ({
  initialValues,
  onSubmit,
}: EditProfileFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        await onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="field">
            <label className="label" htmlFor="registrationNumber">
              Registration number
            </label>
            <div className="control has-icons-left">
              <Field
                id="registrationNumber"
                name="registrationNumber"
                className="input"
                disabled={isSubmitting}
              />
              <span className="icon is-left">
                <FontAwesomeIcon
                  icon={faCar}
                  title="Registration number icon"
                />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="alternativeRegistrationNumber">
              Alternative registration number
            </label>
            <div className="control has-icons-left">
              <Field
                id="alternativeRegistrationNumber"
                name="alternativeRegistrationNumber"
                className="input"
                disabled={isSubmitting}
              />
              <span className="icon is-left">
                <FontAwesomeIcon
                  icon={faCar}
                  title="Alternative registration number icon"
                />
              </span>
            </div>
          </div>
          <div className="control">
            <button
              type="submit"
              className="button is-link"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving" : "Save"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
