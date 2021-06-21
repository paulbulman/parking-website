import { RequestsRequestResult } from "../../hooks/api/queries/requests/types";
import { RequestEdit } from "../../pages/EditRequests/types";

export interface RequestsCalendarProps {
  weeks: RequestsRequestResult["requests"]["weeks"];
  requestEdits: RequestEdit[];
  onChange: (requestEdit: RequestEdit) => void;
}
