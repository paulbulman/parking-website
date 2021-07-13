import { formatISO } from "date-fns";
import { DailyDetailsRequestResult } from "../../hooks/api/queries/dailyDetails/types";

type dailyDetailsData = DailyDetailsRequestResult["details"][0];

export const formatDate = (day: Date) => {
  return formatISO(day, {
    representation: "date",
  });
};

export const getDailyData = (data: dailyDetailsData[], localDate: Date) => {
  const localDateString = formatDate(localDate);
  const dailyData = data.find((d) => d.localDate === localDateString && d.data);

  if (!dailyData) {
    throw new Error("Could not find data for requested date.");
  }

  return dailyData.data;
};
