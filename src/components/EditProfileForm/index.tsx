import { Formik, Field, Form } from "formik";
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
            <div className="control">
              <Field
                id="registrationNumber"
                name="registrationNumber"
                className="input"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="alternativeRegistrationNumber">
              Alternative registration number
            </label>
            <div className="control">
              <Field
                id="alternativeRegistrationNumber"
                name="alternativeRegistrationNumber"
                className="input"
                disabled={isSubmitting}
              />
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
