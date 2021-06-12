import type { OverviewRequestResult } from "../../hooks/api/overview/types";

export interface OverviewCalendarProps {
  weeks: OverviewRequestResult["overview"]["weeks"];
}
