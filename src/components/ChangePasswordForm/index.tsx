import { Formik, Field, Form } from "formik";
import { ChangePasswordFormProps } from "./types";

export const ChangePasswordForm = ({ onSubmit }: ChangePasswordFormProps) => {
  const initialValues = { password: "", confirmPassword: "" };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        await onSubmit(values);
        setSubmitting(false);
        resetForm({ values: initialValues });
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              required
              autoFocus
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
              {isSubmitting ? "Setitng new password" : "Set new password"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
