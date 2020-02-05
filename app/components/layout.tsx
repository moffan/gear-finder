import styled from "styled-components";

export const ScrollViewer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const Row = styled.div`
  display: flex;
`;

export const Container = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 7fr 2fr;
  grid-template-rows: 1fr 23fr 1fr;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
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
  background-color: lightblue;
  grid-area: main;
  overflow: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const Aside = styled.div`
  background-color: yellow;
  grid-area: aside;
`;
