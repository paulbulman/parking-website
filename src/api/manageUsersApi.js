import { get, post, del } from "./apiHelpers";

export const getUsers = async () => await get("manageUsers");

export const getUser = async userId => await get(`manageUsers/${userId}`);

export const updateUser = async (userId, userData) =>
  await post(`manageUsers/${userId}`, userData);

export const deleteUser = async userId => await del(`manageUsers/${userId}`);
