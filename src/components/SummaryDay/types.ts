import { SummaryRequestResult } from "../../hooks/api/queries/summary/types";

export interface SummaryDayProps {
  day: SummaryRequestResult["summary"]["weeks"][0]["days"][0];
}
