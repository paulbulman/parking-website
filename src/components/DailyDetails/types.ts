import { DailyDetailsRequestResult } from "../../hooks/api/queries/dailyDetails/types";

export interface DailyDetailsProps {
  details: DailyDetailsRequestResult["details"][0]["data"];
}

export type DailyDetailsUsers = { name: string; isHighlighted: boolean }[];
