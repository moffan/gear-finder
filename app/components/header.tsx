import styled from "@emotion/styled";
import React, { FunctionComponent, useContext } from "react";

import { UserContext } from "../user";
import { colors } from "./colors";

const TopBar = styled.header`
  background-color: ${colors.primary};
  display: flex;
  grid-area: header;
  justify-content: space-between;
`;

const ActionLink = styled.div<{ hide?: boolean }>`
  user-select: none;
  cursor: pointer;
  visibility: ${(props: any): string => (props.hide ? "hidden" : "visible")};
  &:hover {
    color: blue;
  }
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
