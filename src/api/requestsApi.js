import { get, post } from "./apiHelpers";

export const getRequests = async userId => await get(`requests/${userId}`);

export const updateRequests = async (userId, requestsData) =>
  await post(`requests/${userId}`, requestsData);
