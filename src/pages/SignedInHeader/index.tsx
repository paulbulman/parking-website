import { Header } from "../../components/Header";
import { HomeLink } from "../../components/HomeLink";
import { LogoutButton } from "../../components/LogoutButton";
import { useAuthContext } from "../../hooks/context/auth";

export const SignedInHeader = () => {
  const { signOut } = useAuthContext();

  const handleLogoutClick = async () => {
    await signOut();
  };

  return (
    <Header>
      <HomeLink />
      <LogoutButton onClick={handleLogoutClick} />
    </Header>
  );
};
