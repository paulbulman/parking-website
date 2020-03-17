import React from "react";

export default ({ email, errorMessage, onChange, onSubmit }) => {
  const handleChange = event => onChange(event.target.name, event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit();
  };

  const errors = errorMessage ? (
    <div className="text-danger">{errorMessage}</div>
  ) : null;

  return (
    <>
      <h2>Forgotten Password</h2>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <h4>Enter your details below.</h4>
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
              <button className="btn btn-primary" type="submit">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
