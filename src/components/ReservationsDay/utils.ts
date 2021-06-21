import { ReservationEdit } from "../../pages/EditReservations/types";

export const getCurrentValue = (
  localDate: string,
  userIds: string[] | undefined,
  shortLeadTimeSpaces: number,
  reservationEdits: ReservationEdit[]
) => {
  const existing = reservationEdits.find((r) => r.localDate === localDate);

  if (existing) {
    return existing.userIds;
  }

  return [...Array(shortLeadTimeSpaces).keys()].map((index) =>
    userIds && userIds.length > index ? userIds[index] : ""
  );
};

export const createNewValue = (
  selectedUserIds: string[],
  updatedIndex: number,
  updatedUserId: string
) => {
  return selectedUserIds.map((userId, index) =>
    index === updatedIndex ? updatedUserId : userId
  );
};
