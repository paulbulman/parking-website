import { Formik, Field, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FormSubmit } from "../FormSubmit";
import { FindRegistrationNumberFormProps } from "./types";

export const FindRegistrationNumberForm = ({
  initialValues,
  onChange,
  onSubmit,
}: FindRegistrationNumberFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form onChange={onChange}>
          <div className="field has-addons">
            <div className="control has-icons-left">
              <Field
                id="registrationNumber"
                name="registrationNumber"
                title="Registration number input"
                className="input"
                placeholder="AB12CDE"
                disabled={isSubmitting}
              />
              <span className="icon is-left">
                <FontAwesomeIcon
                  icon={faCar}
                  title="Registration number icon"
                />
              </span>
            </div>
            <FormSubmit isLoading={isSubmitting}>
              <FontAwesomeIcon icon={faSearch} title="Search icon" />
            </FormSubmit>
          </div>
        </Form>
      )}
    </Formik>
  );
};
