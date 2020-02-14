import styled from "@emotion/styled";

import { colors } from "./colors";

const text = () => {
  return !window.location.search.includes("?isDarkMode=true")
    ? colors.light
    : colors.dark;
};

export const ScrollViewer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const AppContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 7fr 2fr;
  grid-template-rows: 1fr 23fr 1fr;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "sidebar footer footer";
  height: 98vh;
`;

export const SideBar = styled.div`
  background-color: green;
  display: flex;
  grid-area: sidebar;
  flex-direction: column;
`;

export const Content = styled.div`
  background-color: ${colors.scondary};
  grid-area: main;
  overflow: auto;
  display: flex;
  flex-direction: column;
  overflow: auto;
  color: ${text()};
  display: flex;
`;

export const Aside = styled.div`
  background-color: yellow;
  grid-area: aside;
`;

export const Rows = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Columns = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  background-color: orange;
`;

export const Cell = styled.div<{ size?: number }>`
  flex: ${props => props.size ?? 1};
  border: 2px solid blanchedalmond;
  padding: 1px;
`;
