import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../user";

const TopBar = styled.div`
  background-color: red;
  display: flex;
  grid-area: header;
  justify-content: space-between;
`;

const ActionLink = styled.div<{ hide?: boolean }>`
  user-select: none;
  cursor: pointer;
  visibility: ${props => (props.hide ? "hidden" : "visible")};
  &:hover {
    color: blue;
`;

const Logo = () => <div>Gear Finder</div>;
const Version = () => <div>Version</div>;

const LogoutLink = () => {
  const { logout, isAuthenticated } = useContext(UserContext);

  return (
    <ActionLink hide={!isAuthenticated} onClick={logout}>
      logout
    </ActionLink>
  );
};

export const Header = () => (
  <TopBar>
    <Logo />
    <Version />
    <LogoutLink />
  </TopBar>
);
