import { Formik, Field, Form } from "formik";
import { FormButtons } from "../FormButtons";
import { AddUserFormProps } from "./types";

export const AddUserForm = ({ onSubmit, onCancel }: AddUserFormProps) => {
  return (
    <Formik
      initialValues={{
        email: "",
        confirmEmail: "",
        firstName: "",
        lastName: "",
        registrationNumber: "",
        alternativeRegistrationNumber: "",
        commuteDistance: "",
      }}
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
            <label className="label" htmlFor="confirmEmail">
              Confirm email
            </label>
            <div className="control">
              <Field
                id="confirmEmail"
                name="confirmEmail"
                type="email"
                required
                className="input"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="firstName">
              First name
            </label>
            <div className="control">
              <Field
                id="firstName"
                name="firstName"
                required
                className="input"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="lastName">
              Last name
            </label>
            <div className="control">
              <Field
                id="lastName"
                name="lastName"
                required
                className="input"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="registrationNumber">
              Registration number
            </label>
            <div className="control">
              <Field
                id="registrationNumber"
                name="registrationNumber"
                className="input"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="alternativeRegistrationNumber">
              Alternative registration number
            </label>
            <div className="control">
              <Field
                id="alternativeRegistrationNumber"
                name="alternativeRegistrationNumber"
                className="input"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="commuteDistance">
              Commute distance (mi)
            </label>
            <div className="control">
              <Field
                id="commuteDistance"
                name="commuteDistance"
                type="number"
                className="input"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <FormButtons isSubmitting={isSubmitting} onCancel={onCancel} />
        </Form>
      )}
    </Formik>
  );
};
