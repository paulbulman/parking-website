import React from "react";
import { Link } from "react-router-dom";

export default ({
  firstName,
  lastName,
  registrationNumber,
  alternativeRegistrationNumber,
  commuteDistance,
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
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <h4>Edit user details:</h4>
            <hr />
            {errors}
            <div className="form-group">
              <label htmlFor="input_firstName">First Name</label>
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
              <label htmlFor="input_lastName">Last Name</label>
              <input
                id="input_lastName"
                className="form-control"
                value={lastName}
                name="lastName"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="input_registrationNumber">
                Registration Number
              </label>
              <input
                id="input_registrationNumber"
                className="form-control"
                value={registrationNumber}
                name="registrationNumber"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="input_alternativeRegistrationNumber">
                Alternative Registration Number
              </label>
              <input
                id="input_alternativeRegistrationNumber"
                className="form-control"
                value={alternativeRegistrationNumber}
                name="alternativeRegistrationNumber"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="input_commuteDistance">Commute Distance</label>
              <input
                id="input_commuteDistance"
                className="form-control"
                value={commuteDistance}
                name="commuteDistance"
                onChange={handleChange}
              />
            </div>
            <div>
              <button className="btn btn-primary" type="submit">
                Save
              </button>

              {" | "}

              <Link to="/ManageUsers">Return without saving</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
