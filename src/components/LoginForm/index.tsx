import { Formik, Field, Form } from "formik";
import { LoginFormProps } from "./types";

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        await onSubmit(values);
        setSubmitting(false);
        resetForm({ values: { email: values.email, password: "" } });
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
              {isSubmitting ? "Logging in" : "Log in"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
