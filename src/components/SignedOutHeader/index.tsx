import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Header } from "../Header";
import { NavigationLink } from "../NavigationLink";

export const SignedOutHeader = () => {
  return (
    <Header>
      <div className="navbar-brand">
        <NavigationLink to="/" caption="Home" icon={faUser} />
      </div>
    </Header>
  );
};
