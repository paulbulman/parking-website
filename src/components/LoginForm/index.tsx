import { Formik, Field, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { FormSubmit } from "../FormSubmit";
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
            <div className="control has-icons-left">
              <Field
                id="email"
                name="email"
                type="email"
                required
                autoFocus
                className="input"
                disabled={isSubmitting}
              />
              <span className="icon is-left">
                <FontAwesomeIcon icon={faUser} title="Email icon" />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="password">
              Password
            </label>
            <div className="control has-icons-left">
              <Field
                id="password"
                name="password"
                type="password"
                required
                className="input"
                disabled={isSubmitting}
              />
              <span className="icon is-left">
                <FontAwesomeIcon icon={faKey} title="Password icon" />
              </span>
            </div>
          </div>
          <div className="field">
            <FormSubmit isLoading={isSubmitting}>Log in</FormSubmit>
          </div>
        </Form>
      )}
    </Formik>
  );
};
