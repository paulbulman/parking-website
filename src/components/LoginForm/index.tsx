import { Formik, Field, Form } from "formik";

export const LoginForm = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}
    >
      <Form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Field name="email" className="form-control" type="email" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Password</label>
          <Field name="password" className="form-control" type="password" />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-outline-primary">
            Login
          </button>
        </div>
      </Form>
    </Formik>
  );
};
