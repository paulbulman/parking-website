import { DailyDetailsRequestResult } from "../../hooks/api/queries/dailyDetails/types";

export interface DailyDetailsProps {
  details: DailyDetailsRequestResult["details"][0]["data"];
  isSaving: boolean;
  updateStayInterruptedStatus: (stayInterrupted: boolean) => Promise<void>;
}

export type DailyDetailsUsers = { name: string; isHighlighted: boolean }[];
