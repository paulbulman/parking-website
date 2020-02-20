import React, { useEffect, useState } from "react";
import { getRegistrationNumberData } from "../services/registrationNumberService";

const RegistrationNumbers = () => {
  const [registrationNumberData, setRegistrationNumberData] = useState([]);

  useEffect(() => {
    const loadRegistrationNumberData = async () => {
      setRegistrationNumberData(await getRegistrationNumberData());
    };

    loadRegistrationNumberData();
  }, []);

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
        <tbody>{registrationNumberData.map(createRow)}</tbody>
      </table>
    </>
  );
};

export default RegistrationNumbers;
