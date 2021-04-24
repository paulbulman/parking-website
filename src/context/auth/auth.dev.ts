import Auth from "@aws-amplify/auth";

const fakeDelay = () => new Promise((resolve) => setTimeout(resolve, 500));

const mockUser = { getSignInUserSession: () => true };

Auth.configure = () => {
  return {};
};

Auth.currentAuthenticatedUser = async () => {
  await fakeDelay();
  return Promise.reject("The user is not authenticated");
};

Auth.signIn = async (username, password) => {
  await fakeDelay();

  if (username === "user@example" && password === "pass") {
    return mockUser;
  }

  const error = {
    code: "NotAuthorizedException",
    message: "Incorrect username or password.",
    name: "NotAuthorizedException",
  };

  return Promise.reject(error);
};
