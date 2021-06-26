import { SummaryRequestResult } from "../../hooks/api/queries/summary/types";

export interface SummaryCalendarProps {
  weeks: SummaryRequestResult["summary"]["weeks"];
}
