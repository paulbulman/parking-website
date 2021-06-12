import { Formik, Field, Form } from "formik";
import { AddUserFormProps } from "./types";

export const AddUserForm = ({ onSubmit }: AddUserFormProps) => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        confirmEmail: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        await onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
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
            <button
              type="submit"
              className="btn btn-outline-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving" : "Save"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
