import { Formik, Field, Form } from "formik";
import { EditProfileFormProps } from "./types";
import { FormButtons } from "../FormButtons";

export const EditProfileForm = ({
  initialValues,
  onSubmit,
  onCancel,
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
          <div className="form-group">
            <label htmlFor="registrationNumber">Registration number</label>
            <Field
              id="registrationNumber"
              name="registrationNumber"
              className="form-control"
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <label htmlFor="alternativeRegistrationNumber">
              Alternative registration number
            </label>
            <Field
              id="alternativeRegistrationNumber"
              name="alternativeRegistrationNumber"
              className="form-control"
              disabled={isSubmitting}
            />
          </div>
          <FormButtons isSubmitting={isSubmitting} onCancel={onCancel} />
        </Form>
      )}
    </Formik>
  );
};
