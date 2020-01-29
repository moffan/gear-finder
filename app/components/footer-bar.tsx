import styled from "styled-components";
import React from "react";
import { useLocation } from "react-router-dom";

const Footer = styled.div`
  background-color: sandybrown;
  grid-area: footer;
  display: flex;
  justify-content: space-between;
`;

const Location = () => {
  const location = useLocation();
  return <div>Location: {location.pathname}</div>;
};

export const FooterBar = () => (
  <Footer>
    Footer
    <Location />
  </Footer>
);
