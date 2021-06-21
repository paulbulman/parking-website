import { RegistrationNumbersTableProps } from "./types";

export const RegistrationNumbersTable = ({
  registrationNumbers,
}: RegistrationNumbersTableProps) => {
  const rows = registrationNumbers.map((data) => (
    <tr key={data.registrationNumber}>
      <td>{data.registrationNumber}</td>
      <td>{data.name}</td>
    </tr>
  ));

  return (
    <table className="table table-top table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          <th>Registration number</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
