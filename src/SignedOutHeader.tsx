import { Header } from "./components/Header";
import { HeaderLink } from "./components/HeaderLink";

export const SignedOutHeader = () => {
  return (
    <Header>
      <HeaderLink to="/" caption="Home" />
    </Header>
  );
};
