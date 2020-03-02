import React, { useEffect, useState } from "react";
import { getRegistrationNumbersData } from "../services/registrationNumbersService";

const RegistrationNumbers = () => {
  const [registrationNumbersData, setRegistrationNumbersData] = useState([]);

  useEffect(() => {
    const loadRegistrationNumbersData = async () => {
      setRegistrationNumbersData(await getRegistrationNumbersData());
    };

    loadRegistrationNumbersData();
  }, []);

  const createRow = singlePersonData => (
    <tr key={singlePersonData.registrationNumber}>
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
        <tbody>{registrationNumbersData.map(createRow)}</tbody>
      </table>
    </>
  );
};

export default RegistrationNumbers;
