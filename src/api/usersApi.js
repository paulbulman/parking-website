import { get } from "./apiHelpers";

export const getUsers = async () => await get("users");
