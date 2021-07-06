import { Header } from "../Header";
import { HomeLink } from "../HomeLink";

export const SignedOutHeader = () => {
  return (
    <Header>
      <div className="navbar-brand">
        <HomeLink />
      </div>
    </Header>
  );
};
