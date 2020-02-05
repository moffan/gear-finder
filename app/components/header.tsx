import React, { useContext, FunctionComponent } from "react";
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
  visibility: ${(props): string => (props.hide ? "hidden" : "visible")};
  &:hover {
    color: blue;
`;

const Logo: FunctionComponent = () => <div>Gear Finder</div>;
const Version: FunctionComponent = () => <div>Version</div>;

const LogoutLink: FunctionComponent = () => {
  const { logout, isAuthenticated } = useContext(UserContext);

  return (
    <ActionLink hide={!isAuthenticated} onClick={logout}>
      logout
    </ActionLink>
  );
};

export const Header: FunctionComponent = () => (
  <TopBar>
    <Logo />
    <Version />
    <LogoutLink />
  </TopBar>
);
