import { OverviewRequestResult } from "../../hooks/api/queries/overview/types";

export interface OverviewCalendarProps {
  weeks: OverviewRequestResult["overview"]["weeks"];
}
