import Amplify from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";

export const configure = config => Amplify.configure(config);

export const signIn = async (username, password) =>
  await Auth.signIn(username, password);

export const signOut = async () => await Auth.signOut();

export const currentUser = async () => await Auth.currentAuthenticatedUser();

export const currentSession = async () => await Auth.currentSession();
