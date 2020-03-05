import moment from "moment";
import { getSummary } from "../api/summaryApi";

export const getSummaryData = async userId => {
  const rawData = await getSummary(userId);

  return rawData.map(s => ({
    date: moment(s.date, "YYYY-MM-DD"),
    allocated: s.allocated,
    interrupted: s.interrupted,
    highlight: s.highlight
  }));
};
