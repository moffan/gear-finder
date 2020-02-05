import styled from "styled-components";
import React, { FunctionComponent } from "react";
import { useLocation } from "react-router-dom";

const Footer = styled.div`
  background-color: sandybrown;
  grid-area: footer;
  display: flex;
  justify-content: space-between;
`;

const Location: FunctionComponent = () => {
  const location = useLocation();
  return <div>Location: {location.pathname}</div>;
};

export const FooterBar: FunctionComponent = () => (
  <Footer>
    Footer
    <Location />
  </Footer>
);
