import { UsersSelectProps } from "./types";

export const UsersSelect = ({ users, userId, onChange }: UsersSelectProps) => {
  return (
    <div className="select">
      <select
        value={userId}
        onChange={(event) => onChange(event.target.value)}
        title="User"
      >
        <option value="">Select user</option>
        {users.map((u) => (
          <option key={u.userId} value={u.userId}>
            {u.name}
          </option>
        ))}
      </select>
    </div>
  );
};
