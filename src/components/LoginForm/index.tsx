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
            <label className="label" htmlFor="password">
              Password
            </label>
            <div className="control">
              <Field
                id="password"
                name="password"
                type="password"
                required
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
              {isSubmitting ? "Logging in" : "Log in"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
