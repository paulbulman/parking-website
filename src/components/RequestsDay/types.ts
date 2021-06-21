import { RequestsRequestResult } from "../../hooks/api/queries/requests/types";
import { RequestEdit } from "../../pages/EditRequests/types";

export interface RequestsDayProps {
  day: RequestsRequestResult["requests"]["weeks"][0]["days"][0];
  requestEdits: RequestEdit[];
  onChange: (requsetEdit: RequestEdit) => void;
}
