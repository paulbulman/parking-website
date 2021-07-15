import { Formik, Field, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlockAlt, faKey } from "@fortawesome/free-solid-svg-icons";
import { FormSubmit } from "../FormSubmit";
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
          <div className="field">
            <label className="label" htmlFor="code">
              Code
            </label>
            <div className="control has-icons-left">
              <Field
                id="code"
                name="code"
                required
                autoFocus
                className="input"
                disabled={isSubmitting}
              />
              <span className="icon is-left">
                <FontAwesomeIcon icon={faUnlockAlt} title="Code icon" />
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
            <FormSubmit isLoading={isSubmitting}>Reset password</FormSubmit>
          </div>
        </Form>
      )}
    </Formik>
  );
};
