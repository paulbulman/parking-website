import { Formik, Field, Form } from "formik";
import { ForgotPasswordFormProps } from "./types";

export const ForgotPasswordForm = ({ onSubmit }: ForgotPasswordFormProps) => {
  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={async (values, { setSubmitting }) => {
        await onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              required
              autoFocus
              className="form-control"
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-outline-primary"
              disabled={isSubmitting}
            >
              Continue
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
