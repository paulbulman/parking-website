import classNames from "classnames";
import { DailyDetailsProps, DailyDetailsUsers } from "./types";

export const DailyDetails = ({
  details,
  isSaving,
  updateStayInterruptedStatus,
}: DailyDetailsProps) => {
  const handleStayInterrupted = async () => {
    await updateStayInterruptedStatus(true);
  };

  const handleReRequestSpace = async () => {
    await updateStayInterruptedStatus(false);
  };

  if (!details) {
    return <div>No data.</div>;
  }

  const {
    allocatedUsers,
    interruptedUsers,
    pendingUsers,
    stayInterruptedStatus,
  } = details;

  const requestsExist =
    allocatedUsers.length || interruptedUsers.length || pendingUsers.length;

  if (!requestsExist) {
    return (
      <div className="pb-5">There are no requests for the selected date.</div>
    );
  }

  const showStayInterrupted =
    stayInterruptedStatus.isAllowed && !stayInterruptedStatus.isSet;

  const showReRequestSpace =
    stayInterruptedStatus.isAllowed && stayInterruptedStatus.isSet;

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
              <li
                className={
                  user.isHighlighted ? "has-text-weight-bold" : undefined
                }
                key={user.name}
              >
                {user.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const buttonClasses = classNames({
    "button ": true,
    "mb-4": true,
    "is-loading": isSaving,
  });

  return (
    <>
      {createSection("Allocated", "has-text-success-dark", allocatedUsers)}
      {createSection("Interrupted", "has-text-danger", interruptedUsers)}
      {createSection("Pending", "has-text-grey-light", pendingUsers)}
      {showStayInterrupted && (
        <button onClick={handleStayInterrupted} className={buttonClasses}>
          Stay interrupted
        </button>
      )}
      {showReRequestSpace && (
        <button onClick={handleReRequestSpace} className={buttonClasses}>
          Re-request space
        </button>
      )}
    </>
  );
};
