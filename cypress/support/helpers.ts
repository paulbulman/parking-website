import type { UserType } from "../../src/context/auth/auth.dev.types";

export const mockLogin = (userType: UserType = "Normal") => {
  window.localStorage.setItem("signedInUserType", userType);
};
