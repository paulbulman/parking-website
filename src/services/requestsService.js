import moment from "moment";
import { getRequests, updateRequests } from "../api/requestsApi";

export const getRequestsData = async userId => {
  const rawData = await getRequests(userId);

  return rawData.map(r => ({
    date: moment(r.date, "YYYY-MM-DD"),
    requested: r.requested
  }));
};

export const updateRequestsData = async (userId, requestsData) => {
  const rawData = requestsData.map(r => ({
    date: r.date.format("YYYY-MM-DD"),
    requested: r.requested
  }));
  
  return await updateRequests(userId, rawData);
};
