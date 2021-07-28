import { useState } from "react";
import classNames from "classnames";
import {
  faHome,
  faCar,
  faCalendarAlt,
  faUsers,
  faUser,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Header } from "../Header";
import { NavigationLink } from "../NavigationLink";
import { LogoutButton } from "../LogoutButton";
import { NavigationToggle } from "../NavigationToggle";
import { SignedInHeaderProps } from "./types";

export const SignedInHeader = ({
  groups,
  firstName,
  onSignout,
}: SignedInHeaderProps) => {
  const [toggleExpanded, setToggleExpanded] = useState(false);

  const handleNavigationToggleClick = () => {
    setToggleExpanded((value) => !value);
  };

  const menuClasses = classNames({
    "navbar-menu": true,
    "is-active": toggleExpanded,
  });

  return (
    <Header>
      <div className="navbar-brand">
        <NavigationLink to="/" caption="Home" icon={faHome} />

        <NavigationToggle
          onClick={handleNavigationToggleClick}
          expanded={toggleExpanded}
        />
      </div>

      <div className={menuClasses}>
        <div className="navbar-start">
          <NavigationLink
            to="/registration-numbers"
            caption="Registration Numbers"
            icon={faCar}
          />
          {groups.includes("TeamLeader") && (
            <NavigationLink
              to="/edit-reservations"
              caption="Edit Reservations"
              icon={faCalendarAlt}
            />
          )}
          {groups.includes("UserAdmin") && (
            <NavigationLink to="/users" caption="Users" icon={faUsers} />
          )}
        </div>
        <div className="navbar-end">
          <NavigationLink to="/profile" caption={firstName} icon={faUser} />
          <NavigationLink to="/faq" caption="FAQ" icon={faQuestionCircle} />
          <LogoutButton onClick={onSignout} />
        </div>
      </div>
    </Header>
  );
};
