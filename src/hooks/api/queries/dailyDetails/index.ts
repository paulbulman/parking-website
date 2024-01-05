import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../context/auth";
import { get } from "../../helpers";
import { DailyDetailsRequestResult } from "./types";

export const useDailyDetails = () => {
  const endpoint = "dailyDetails";

  const { getToken } = useAuthContext();

  return useQuery({
    queryKey: [endpoint],
    queryFn: () => get<DailyDetailsRequestResult>(getToken, endpoint),
  });
};
