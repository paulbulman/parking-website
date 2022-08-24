import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Table } from "../Table";
import { UsersTableProps } from "./types";

export const UsersTable = ({ users, onEdit, onDelete }: UsersTableProps) => {
  const rows = users.map((user) => (
    <tr key={user.userId}>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.registrationNumber}</td>
      <td>{user.alternativeRegistrationNumber}</td>
      <td>{user.commuteDistance}</td>
      <td>
        <button
          type="button"
          className="button is-small is-ghost"
          onClick={() => onEdit(user)}
        >
          <FontAwesomeIcon icon={faEdit} title="Edit user" />
        </button>
        <button
          type="button"
          className="button is-small is-ghost"
          onClick={() => onDelete(user)}
        >
          <FontAwesomeIcon icon={faTrash} title="Delete user" />
        </button>
      </td>
    </tr>
  ));

  return (
    <Table>
      <thead>
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
    </Table>
  );
};
