import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Header } from "../../components/Header";
import { HomeLink } from "../../components/HomeLink";
import { LogoutButton } from "../../components/LogoutButton";
import { NavigationLink } from "../../components/NavigationLink";
import { useAuthContext } from "../../hooks/context/auth";

export const SignedInHeader = () => {
  const { signOut, getGroups } = useAuthContext();

  const handleLogoutClick = async () => {
    await signOut();
  };

  const groups = getGroups();

  return (
    <Header>
      <HomeLink />
      <div className="navbar-collapse d-sm-inline-flex flex-sm-row-reverse collapse">
        <ul className="navbar-nav">
          <li className="navbar-item">
            <Link className="nav-link" to="/profile">
              <FontAwesomeIcon icon={faUser} title="Edit profile" />
            </Link>
          </li>
          <li className="navbar-item">
            <LogoutButton onClick={handleLogoutClick} />
          </li>
        </ul>
        <ul className="navbar-nav flex-grow-1">
          <li className="navbar-item">
            <NavigationLink to="/edit-requests" caption="Edit Requests" />
          </li>
          <li className="navbar-item">
            <NavigationLink
              to="/registration-numbers"
              caption="Registration Numbers"
            />
          </li>
          {groups.includes("TeamLeader") && (
            <li className="navbar-item">
              <NavigationLink
                to="/edit-reservations"
                caption="Edit Reservations"
              />
            </li>
          )}
          {groups.includes("UserAdmin") && (
            <li className="navbar-item">
              <NavigationLink to="/users" caption="Users" />
            </li>
          )}
        </ul>
      </div>
    </Header>
  );
};
