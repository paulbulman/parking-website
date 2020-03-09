import { get, put } from "./apiHelpers";

export const getProfile = async userId => await get(`profile/${userId}`);

export const updateProfile = async (userId, profileData) =>
  await put(`profile/${userId}`, profileData);
