import React from "react";

export default ({
  oldPassword,
  newPassword,
  confirmNewPassword,
  errorMessage,
  onChange,
  onSave
}) => {
  const handleChange = event => onChange(event.target.name, event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    onSave();
  };

  const errors = errorMessage ? (
    <div className="text-danger">{errorMessage}</div>
  ) : null;

  return (
    <>
      <h4>Password</h4>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            {errors}
            <div className="form-group">
              <label htmlFor="input_oldPassword">Old password</label>
              <input
                id="input_oldPassword"
                className="form-control"
                value={oldPassword}
                name="oldPassword"
                type="password"
                autoFocus
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
