import { useState } from "react";
import { Header } from "../Header";
import { HomeLink } from "../HomeLink";
import { NavigationSection } from "../NavigationSection";
import { NavigationLink } from "../NavigationLink";
import { LogoutButton } from "../LogoutButton";
import { NavigationToggle } from "../NavigationToggle";
import { SignedInHeaderProps } from "./types";

export const SignedInHeader = ({ groups, onSignout }: SignedInHeaderProps) => {
  const [toggleExpanded, setToggleExpanded] = useState(false);

  const handleNavigationToggleClick = () => {
    setToggleExpanded((value) => !value);
  };

  return (
    <Header>
      <NavigationToggle
        onClick={handleNavigationToggleClick}
        expanded={toggleExpanded}
      />
      <HomeLink />
      <NavigationSection expanded={toggleExpanded}>
        <NavigationLink to="/overview" caption="Overview" />
        <NavigationLink to="/edit-requests" caption="Edit Requests" />
        <NavigationLink
          to="/registration-numbers"
          caption="Registration Numbers"
        />
        {groups.includes("TeamLeader") && (
          <NavigationLink to="/edit-reservations" caption="Edit Reservations" />
        )}
        {groups.includes("UserAdmin") && (
          <NavigationLink to="/users" caption="Users" />
        )}
      </NavigationSection>
      <NavigationSection expanded={toggleExpanded}>
        <NavigationLink to="/profile" caption="Profile" />
        <LogoutButton onClick={onSignout} />
      </NavigationSection>
    </Header>
  );
};
