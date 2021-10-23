import { Formik, Field, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { FormSubmit } from "../FormSubmit";
import { EditProfileFormProps } from "./types";

export const EditProfileForm = ({
  groups,
  initialValues,
  onChange,
  onSubmit,
}: EditProfileFormProps) => {
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
            <label className="label" htmlFor="requestReminderEnabled">
              Requests reminder
            </label>
            <div className="control">
              <label className="checkbox">
                <Field
                  id="requestReminderEnabled"
                  name="requestReminderEnabled"
                  type="checkbox"
                  disabled={isSubmitting}
                />
                <span className="pl-2">
                  Send me a reminder if I have no upcoming requests
                </span>
              </label>
            </div>
          </div>
          {groups.includes("TeamLeader") && (
            <div className="field">
              <label className="label" htmlFor="reservationReminderEnabled">
                Reservations reminder
              </label>
              <div className="control">
                <label className="checkbox">
                  <Field
                    id="reservationReminderEnabled"
                    name="reservationReminderEnabled"
                    type="checkbox"
                    disabled={isSubmitting}
                  />
                  <span className="pl-2">
                    Send me a reminder if there are no day-ahead reservations
                  </span>
                </label>
              </div>
            </div>
          )}
          <div className="field">
            <FormSubmit isLoading={isSubmitting}>Save</FormSubmit>
          </div>
        </Form>
      )}
    </Formik>
  );
};
