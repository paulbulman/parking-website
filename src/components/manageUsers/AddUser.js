import React from "react";

export default ({
  firstName,
  lastName,
  emailAddress,
  confirmEmailAddress,
  errorMessage,
  onChange,
  onCreate
}) => {
  const handleChange = event => onChange(event.target.name, event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    onCreate();
  };

  const errors = errorMessage ? (
    <div className="text-danger">{errorMessage}</div>
  ) : null;

  return (
    <>
      <h2>Create new user</h2>
      <h4>Enter details below:</h4>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            {errors}
            <div className="form-group">
              <label htmlFor="input_firstName">First name</label>
              <input
                id="input_firstName"
                className="form-control"
                value={firstName}
                name="firstName"
                autoFocus
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="input_password">Last name</label>
              <input
                id="input_lastName"
                className="form-control"
                value={lastName}
                name="lastName"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="input_emailAddress">Email address</label>
              <input
                id="input_emailAddress"
                className="form-control"
                value={emailAddress}
                name="emailAddress"
                type="email"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="input_confirmEmailAddress">
                Confirm email address
              </label>
              <input
                id="input_confirmEmailAddress"
                className="form-control"
                value={confirmEmailAddress}
                name="confirmEmailAddress"
                type="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <button className="btn btn-primary" type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
