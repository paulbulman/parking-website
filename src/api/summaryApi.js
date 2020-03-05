import { get } from "./apiHelpers";

export const getSummary = async userId => await get(`summary/${userId}`);
