import { Formik, Field, Form } from "formik";
import { AddUserFormProps } from "./types";
import styles from "./styles.module.css";

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
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              required
              autoFocus
              className="form-control"
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmEmail">Confirm email</label>
            <Field
              id="confirmEmail"
              name="confirmEmail"
              type="email"
              required
              className="form-control"
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First name</label>
            <Field
              id="firstName"
              name="firstName"
              required
              className="form-control"
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last name</label>
            <Field
              id="lastName"
              name="lastName"
              required
              className="form-control"
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <label htmlFor="registrationNumber">Registration number</label>
            <Field
              id="registrationNumber"
              name="registrationNumber"
              className="form-control"
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <label htmlFor="alternativeRegistrationNumber">
              Alternative registration number
            </label>
            <Field
              id="alternativeRegistrationNumber"
              name="alternativeRegistrationNumber"
              className="form-control"
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <label htmlFor="commuteDistance">Commute distance (mi)</label>
            <Field
              id="commuteDistance"
              name="commuteDistance"
              type="number"
              className="form-control"
              disabled={isSubmitting}
            />
          </div>
          <div className={styles.buttons}>
            <button
              type="submit"
              className="btn btn-outline-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving" : "Save"}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
