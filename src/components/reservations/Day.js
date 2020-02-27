import React from "react";

export default ({ data, users, onChange }) => (
  <>
    <p className="day-header">{data.date.format("DD MMM")}</p>
    {data.reservations.map((selectedUserId, index) => (
      <div key={index}>
        <select
          defaultValue={selectedUserId}
          onChange={event => onChange(data.date, index, event.target.value)}
        >
          <option value="">Select</option>
          {users.map(u => (
            <option key={u.userId} value={u.userId}>
              {u.name}
            </option>
          ))}
        </select>
      </div>
    ))}
  </>
);
