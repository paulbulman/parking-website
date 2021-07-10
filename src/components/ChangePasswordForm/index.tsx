import { Formik, Field, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
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
                autoFocus
                minLength="10"
                className="input"
                disabled={isSubmitting}
              />
              <span className="icon is-left">
                <FontAwesomeIcon icon={faKey} title="Password icon" />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="confirmPassword">
              Confirm password
            </label>
            <div className="control has-icons-left">
              <Field
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="input"
                disabled={isSubmitting}
              />
              <span className="icon is-left">
                <FontAwesomeIcon icon={faKey} title="Confirm password icon" />
              </span>
            </div>
          </div>
          <div className="field">
            <button
              type="submit"
              className="button is-link"
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
