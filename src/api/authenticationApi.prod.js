import Amplify from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";

export const configure = config => Amplify.configure(config);

export const signIn = async (username, password) =>
  await Auth.signIn(username, password);

export const completeNewPassword = async (signInResult, newPassword) =>
  await Auth.completeNewPassword(signInResult, newPassword);

export const forgotPassword = async username =>
  await Auth.forgotPassword(username);

export const forgotPasswordSubmit = async (username, resetCode, newPassword) =>
  await Auth.forgotPasswordSubmit(username, resetCode, newPassword);

export const signOut = async () => await Auth.signOut();

export const currentUser = async () => await Auth.currentAuthenticatedUser();

export const currentSession = async () => await Auth.currentSession();

export const changePassword = async (oldPassword, newPassword) => {
  const user = await currentUser();
  return await Auth.changePassword(user, oldPassword, newPassword);
};
