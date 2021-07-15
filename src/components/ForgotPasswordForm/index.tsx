import { Formik, Field, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FormSubmit } from "../FormSubmit";
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
            <FormSubmit isLoading={isSubmitting}>Continue</FormSubmit>
          </div>
        </Form>
      )}
    </Formik>
  );
};
