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
          <div className="field">
            <label className="label" htmlFor="email">
              Email
            </label>
            <div className="control">
              <Field
                id="email"
                name="email"
                type="email"
                required
                autoFocus
                className="input"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className="field">
            <button
              type="submit"
              className="button is-link"
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
