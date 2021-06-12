import type { RequestEdit } from "../../pages/EditRequests/types";

export const getCurrentValue = (
  localDate: string,
  requested: boolean,
  requestEdits: RequestEdit[]
) => {
  const filteredRequestEdits = requestEdits.filter(
    (requestEdit) => requestEdit.localDate === localDate
  );
  return filteredRequestEdits.length
    ? filteredRequestEdits[filteredRequestEdits.length - 1].requested
    : requested;
};
