import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { UsersTableProps } from "./types";
import styles from "./styles.module.css";

export const UsersTable = ({ users, onEdit }: UsersTableProps) => {
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
          className={styles.button}
          onClick={() => onEdit(user.userId)}
        >
          <FontAwesomeIcon icon={faEdit} title="Edit user" />
        </button>
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
