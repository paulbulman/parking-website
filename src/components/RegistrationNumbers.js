import React from "react";

const RegistrationNumbers = () => {
  const data = [
    { registrationNumber: "AB123CDE", name: "Person 1" },
    { registrationNumber: "X789XZ", name: "Person 2" }
  ];

  const createRow = singlePersonData => (
    <tr>
      <td>{singlePersonData.registrationNumber}</td>
      <td>{singlePersonData.name}</td>
    </tr>
  );

  return (
    <>
      <h2>Registration Numbers</h2>
      <h4>Also known as, "Who's parked behind me?"</h4>
      <hr />
      <table className="table table-top table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Registration number</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{data.map(createRow)}</tbody>
      </table>
    </>
  );
};

export default RegistrationNumbers;
