import type { OverviewRequestResult } from "../../hooks/api/queries/overview/types";

export interface OverviewDayProps {
  day: OverviewRequestResult["overview"]["weeks"][0]["days"][0];
}