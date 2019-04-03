import React from "react";
import styled from "@emotion/styled";
import { Icon } from ".";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  cursor: pointer
`;

const IconButton: React.FunctionComponent<{
  icon: string;
  onClick?: () => void;
}> = ({ icon, onClick, children }) => (
  <Container onClick={onClick}>
    <Icon icon={icon} />
    {children}
  </Container>
);

export default IconButton;
