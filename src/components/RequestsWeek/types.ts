import { RequestsRequestResult } from "../../hooks/api/queries/requests/types";
import { RequestEdit } from "../../pages/EditRequests/types";

export interface RequestsWeekProps {
  days: RequestsRequestResult["requests"]["weeks"][0]["days"];
  requestEdits: RequestEdit[];
  onChange: (requestEdit: RequestEdit) => void;
}
