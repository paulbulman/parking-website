import { get, post } from "./apiHelpers";

export const getProfile = async userId => await get(`profile/${userId}`);

export const updateProfile = async (userId, profileData) =>
  await post(`profile/${userId}`, profileData);
