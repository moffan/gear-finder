import styled from "styled-components";
import { NavLink } from "react-router-dom";
import React from "react";

export * from "./header";
export * from "./footer-bar";

export const HomeLink = () => <NavLink to="/home">Home</NavLink>;

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

export const List = styled.ul`
  overflow: auto;
`;

export const ListItem = styled.li``;

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const SideBar = styled.div`
  background-color: green;
  display: flex;
  grid-area: sidebar;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  background-color: lightblue;
  grid-area: main;
  overflow: auto;
  flex-direction: column;
`;

export const Aside = styled.div`
  background-color: yellow;
  grid-area: aside;
`;
