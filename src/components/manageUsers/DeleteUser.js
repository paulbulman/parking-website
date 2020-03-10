import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { getUser, deleteUser } from "../../api/manageUsersApi";

export default () => {
  const { userId } = useParams();
  const history = useHistory();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const loadUserData = async () => {
      setUserData(await getUser(userId));
    };

    loadUserData();
  }, [userId]);

  const handleDelete = async () => {
    await deleteUser(userId);
    history.push("/ManageUsers");
  };

  return (
    <>
      <h2>Delete User</h2>
      <h4>Are you sure you want to delete this user? This cannot be undone.</h4>
      <hr />

      <div>
        <dl className="row">
          <dt className="col-sm-2">First Name</dt>
          <dd className="col-sm-10">{userData.firstName}</dd>

          <dt className="col-sm-2">Last Name</dt>
          <dd className="col-sm-10">{userData.lastName}</dd>
        </dl>

        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>

        <Link className="btn btn-link" to="/ManageUsers">Return without deleting</Link>
      </div>
    </>
  );
};
