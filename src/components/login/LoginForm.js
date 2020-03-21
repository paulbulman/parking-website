import React from "react";

const LoginForm = ({
  email,
  password,
  errorMessage,
  onChange,
  onLogin,
  onForgottenPassword
}) => {
  const handleChange = event => onChange(event.target.name, event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    onLogin();
  };

  const errors = errorMessage ? (
    <div className="text-danger">{errorMessage}</div>
  ) : null;

  return (
    <>
      <h2>Log in</h2>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <h4>Enter your details below to log in.</h4>
            <hr />
            {errors}
            <div className="form-group">
              <label htmlFor="input_email">Email</label>
              <input
                id="input_email"
                className="form-control"
                value={email}
                name="email"
                type="email"
                autoFocus
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="input_password">Password</label>
              <input
                id="input_password"
                className="form-control"
                value={password}
                name="password"
                type="password"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" type="submit">
                Log in
              </button>
              <button className="btn btn-link" onClick={onForgottenPassword}>
                Forgotten Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
