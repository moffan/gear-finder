import styled from "@emotion/styled";
import React from "react";

const Container = styled.div`
  margin: 5px;
`;

interface CardProps {
  onClick?: () => void;
}

const Card: React.FunctionComponent<CardProps> = ({ onClick, children }) => {
  return <Container onClick={onClick}>{children}</Container>;
};

export default Card;
