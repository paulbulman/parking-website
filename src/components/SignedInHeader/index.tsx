import { useState } from "react";
import classNames from "classnames";
import { Header } from "../Header";
import { HomeLink } from "../HomeLink";
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
        <HomeLink />

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
          />
          {groups.includes("TeamLeader") && (
            <NavigationLink
              to="/edit-reservations"
              caption="Edit Reservations"
            />
          )}
          {groups.includes("UserAdmin") && (
            <NavigationLink to="/users" caption="Users" />
          )}
        </div>
        <div className="navbar-end">
          <NavigationLink to="/profile" caption={firstName} />
          <LogoutButton onClick={onSignout} />
        </div>
      </div>
    </Header>
  );
};
