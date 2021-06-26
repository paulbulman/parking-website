import { SummaryRequestResult } from "../../hooks/api/queries/summary/types";

export interface SummaryWeekProps {
  days: SummaryRequestResult["summary"]["weeks"][0]["days"];
}
