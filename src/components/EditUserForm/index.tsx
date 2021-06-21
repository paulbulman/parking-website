import { Formik, Field, Form } from "formik";
import { EditUserFormProps } from "./types";
import { FormButtons } from "../FormButtons";

export const EditUserForm = ({
  initialValues,
  onSubmit,
  onCancel,
}: EditUserFormProps) => {
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
            <label htmlFor="firstName">First name</label>
            <Field
              id="firstName"
              name="firstName"
              required
              autoFocus
              className="form-control"
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last name</label>
            <Field
              id="lastName"
              name="lastName"
              required
              className="form-control"
              disabled={isSubmitting}
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="commuteDistance">Commute distance (mi)</label>
            <Field
              id="commuteDistance"
              name="commuteDistance"
              type="number"
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
