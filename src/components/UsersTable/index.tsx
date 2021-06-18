import { Link } from "react-router-dom";
import { UsersTableProps } from "./types";

export const UsersTable = ({ users }: UsersTableProps) => {
  const rows = users.map((user) => (
    <tr key={user.userId}>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.registrationNumber}</td>
      <td>{user.alternativeRegistrationNumber}</td>
      <td>{user.commuteDistance}</td>
      <td>
        <Link
          className="btn btn-link btn-sm"
          to={`/users/edit/${user.userId}`}
        >
          Edit
        </Link>
      </td>
    </tr>
  ));

  return (
    <table className="table table-top table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Registration Number</th>
          <th>Alternative Registration Number</th>
          <th>Commute Distance</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
