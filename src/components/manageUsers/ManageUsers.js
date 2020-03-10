import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { getUsers } from "../../api/manageUsersApi";

export default () => {
  const [manageUsersData, setManageUsersData] = useState([]);

  useEffect(() => {
    const loadManageUsersData = async () => {
      setManageUsersData(await getUsers());
    };

    loadManageUsersData();
  }, []);

  const ordered = _.sortBy(manageUsersData, [
    u => u.lastName,
    u => u.firstName
  ]);

  const rows = ordered.map(user => (
    <tr key={user.userId}>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.registrationNumber}</td>
      <td>{user.alternativeRegistrationNumber}</td>
      <td>{user.commuteDistance}</td>
      <td>
        <Link
          className="btn btn-link btn-sm"
          to={`/ManageUsers/Edit/${user.userId}`}
        >
          Edit
        </Link>
        <Link
          className="btn btn-link btn-sm"
          to={`/ManageUsers/Delete/${user.userId}`}
        >
          Delete
        </Link>
      </td>
    </tr>
  ));

  return (
    <>
      <h2>Manage Users</h2>
      <h4>Create new users, or update/delete existing:</h4>
      <hr />
      <p>
        <Link className="btn btn-primary" to="/ManageUsers/Add">
          Create new
        </Link>
      </p>
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
    </>
  );
};
