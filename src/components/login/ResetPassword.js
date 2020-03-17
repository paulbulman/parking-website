import React from "react";

export default ({
  resetCode,
  newPassword,
  confirmNewPassword,
  errorMessage,
  onChange,
  onReset
}) => {
  const handleChange = event => onChange(event.target.name, event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    onReset();
  };

  const errors = errorMessage ? (
    <div className="text-danger">{errorMessage}</div>
  ) : null;

  return (
    <>
      <h2>Reset Password</h2>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <h4>If an account exists, a reset code will be sent to you.</h4>
            <hr />
            {errors}
            <div className="form-group">
              <label htmlFor="input_resetCode">Reset code</label>
              <input
                id="input_resetCode"
                className="form-control"
                value={resetCode}
                name="resetCode"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="input_newPassword">New password</label>
              <input
                id="input_newPassword"
                className="form-control"
                value={newPassword}
                name="newPassword"
                type="password"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="input_confirmNewPassword">
                Confirm new password
              </label>
              <input
                id="input_confirmNewPassword"
                className="form-control"
                value={confirmNewPassword}
                name="confirmNewPassword"
                type="password"
                onChange={handleChange}
              />
            </div>
            <div>
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
