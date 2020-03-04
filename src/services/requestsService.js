import moment from "moment";
import { getUserIdToken } from "./authenticationService";
import { get, post } from "../api/apiHelpers";

export const getRequestsData = async userId => {
  const token = await getUserIdToken();
  const rawData = await get(`requests/${userId}`, token);

  return rawData.map(r => ({
    date: moment(r.date, "YYYY-MM-DD"),
    requested: r.requested
  }));
};

export const updateRequestsData = async (userId, requestsData) => {
  const token = await getUserIdToken();
  return await post(`requests/${userId}`, requestsData, token);
};
