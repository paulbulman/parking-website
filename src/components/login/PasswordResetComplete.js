import React from "react";

export default ({ onContinue }) => {
  const handleSubmit = event => {
    event.preventDefault();
    onContinue();
  };

  return (
    <>
      <h2>Password Reset Complete</h2>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <h4>Your password has been updated successfully.</h4>
            <hr />
            <div className="form-group">
              <button className="btn btn-primary" type="submit">
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
