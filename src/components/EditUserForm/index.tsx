import { Formik, Field, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCar,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";
import { EditUserFormProps } from "./types";
import { FormButtons } from "../FormButtons";

export const EditUserForm = ({
  initialValues,
  onChange,
  onSubmit,
  onCancel,
}: EditUserFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        await onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form onChange={onChange}>
          <div className="field">
            <label className="label" htmlFor="firstName">
              First name
            </label>
            <div className="control has-icons-left">
              <Field
                id="firstName"
                name="firstName"
                required
                autoFocus
                className="input"
                disabled={isSubmitting}
              />
              <span className="icon is-left">
                <FontAwesomeIcon icon={faUser} title="First name icon" />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="lastName">
              Last name
            </label>
            <div className="control has-icons-left">
              <Field
                id="lastName"
                name="lastName"
                required
                className="input"
                disabled={isSubmitting}
              />
              <span className="icon is-left">
                <FontAwesomeIcon icon={faUser} title="Last name icon" />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="registrationNumber">
              Registration number
            </label>
            <div className="control has-icons-left">
              <Field
                id="registrationNumber"
                name="registrationNumber"
                className="input"
                disabled={isSubmitting}
              />
              <span className="icon is-left">
                <FontAwesomeIcon
                  icon={faCar}
                  title="Registration number icon"
                />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="alternativeRegistrationNumber">
              Alternative registration number
            </label>
            <div className="control has-icons-left">
              <Field
                id="alternativeRegistrationNumber"
                name="alternativeRegistrationNumber"
                className="input"
                disabled={isSubmitting}
              />
              <span className="icon is-left">
                <FontAwesomeIcon
                  icon={faCar}
                  title="Alternative registration number icon"
                />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="commuteDistance">
              Commute distance (mi)
            </label>
            <div className="control has-icons-left">
              <Field
                id="commuteDistance"
                name="commuteDistance"
                type="number"
                className="input"
                disabled={isSubmitting}
              />
              <span className="icon is-left">
                <FontAwesomeIcon
                  icon={faMapMarkedAlt}
                  title="Commute distance icon"
                />
              </span>
            </div>
          </div>
          <FormButtons isSubmitting={isSubmitting} onCancel={onCancel} />
        </Form>
      )}
    </Formik>
  );
};
