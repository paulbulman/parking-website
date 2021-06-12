import type { OverviewRequestResult } from "../../hooks/api/queries/overview/types";

export interface OverviewWeekProps {
  days: OverviewRequestResult["overview"]["weeks"][0]["days"];
}
