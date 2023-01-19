import { useAuthContext } from "../../hooks/context/auth";
import { SignedOutHeader } from "../SignedOutHeader";
import { SignedOutRouter } from "../SignedOutRouter";
import { BrowserRouter } from "react-router-dom";

export const SignedOutApp = () => {
  const { authenticationStatus } = useAuthContext();

  return (
    <BrowserRouter>
      <SignedOutHeader />
      <SignedOutRouter authenticationStatus={authenticationStatus} />
    </BrowserRouter>
  );
};
