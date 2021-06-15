import { Formik, Field, Form } from "formik";
import { ForgotPasswordSubmitFormProps } from "./types";

export const ForgotPasswordSubmitForm = ({
  onSubmit,
}: ForgotPasswordSubmitFormProps) => {
  return (
    <Formik
      initialValues={{ code: "", password: "", confirmPassword: "" }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        await onSubmit(values);
        setSubmitting(false);
        resetForm({
          values: { code: values.code, password: "", confirmPassword: "" },
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="code">Code</label>
            <Field
              id="code"
              name="code"
              required
              autoFocus
              className="form-control"
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              required
              minLength="10"
              className="form-control"
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password</label>
            <Field
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
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
              {isSubmitting ? "Resetting password" : "Reset password"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
