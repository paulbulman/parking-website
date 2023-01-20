import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../context/auth";
import { get } from "../../helpers";
import { DailyDetailsRequestResult, DailyDetailsRequestError } from "./types";

export const useDailyDetails = () => {
  const endpoint = "dailyDetails";

  const { getToken } = useAuthContext();

  return useQuery<DailyDetailsRequestResult, DailyDetailsRequestError>(
    [endpoint],
    () => get<DailyDetailsRequestResult>(getToken, endpoint)
  );
};
