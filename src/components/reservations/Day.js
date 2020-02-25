import React from "react";

const Day = ({ data, users }) =>
  data.reservations.map((selectedUserId, index) => (
    <div key={index}>
      <select defaultValue={selectedUserId}>
        <option value={null}>Select</option>
        {users.map(u => (
          <option key={u.userId} value={u.userId}>
            {u.name}
          </option>
        ))}
      </select>
    </div>
  ));

export default Day;
