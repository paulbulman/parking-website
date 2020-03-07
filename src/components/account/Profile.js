import React from "react";

export default ({ registrationNumber, alternativeRegistrationNumber, errorMessage, onChange, onSave }) => {
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
      <h4>Profile</h4>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            {errors}
            <div className="form-group">
              <label htmlFor="input_registrationNumber">Car registration number</label>
              <input
                id="input_registrationNumber"
                className="form-control"
                value={registrationNumber}
                name="registrationNumber"
                autoFocus
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="input_alternativeRegistrationNumber">Alternative car registration number</label>
              <input
                id="input_alternativeRegistrationNumber"
                className="form-control"
                value={alternativeRegistrationNumber}
                name="alternativeRegistrationNumber"
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
