import { Table } from "../Table";
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

  return registrationNumbers.length > 0 ? (
    <Table>
      <thead>
        <tr>
          <th>Registration number</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  ) : (
    <div>No matching registration number found.</div>
  );
};
