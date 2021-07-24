import { DailyDetailsProps, DailyDetailsUsers } from "./types";

export const DailyDetails = ({ details }: DailyDetailsProps) => {
  if (!details) {
    return <div>No data.</div>;
  }

  const { allocatedUsers, interruptedUsers, pendingUsers } = details;

  const requestsExist =
    allocatedUsers.length || interruptedUsers.length || pendingUsers.length;

  if (!requestsExist) {
    return (
      <div className="pb-5">There are no requests for the selected date.</div>
    );
  }

  const createSection = (
    caption: string,
    captionClassName: string,
    users: DailyDetailsUsers
  ) => {
    if (!users.length) {
      return null;
    }

    return (
      <div className="pb-5">
        <h3 className={`${captionClassName} has-text-weight-bold`}>
          {caption}
        </h3>
        <div className="content">
          <ul>
            {users.map((user) => (
              <li key={user.name}>{user.name}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <>
      {createSection("Allocated", "has-text-success-dark", allocatedUsers)}
      {createSection("Interrupted", "has-text-danger", interruptedUsers)}
      {createSection("Pending", "has-text-grey-light", pendingUsers)}
    </>
  );
};
