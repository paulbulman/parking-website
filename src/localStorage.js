const userIdTokenKey = "userIdToken";

export const getUserIdToken = () => localStorage.getItem(userIdTokenKey);

export const setUserIdToken = userIdToken =>
  localStorage.setItem(userIdTokenKey, userIdToken);

export const removeUserIdToken = () => localStorage.removeItem(userIdTokenKey);
