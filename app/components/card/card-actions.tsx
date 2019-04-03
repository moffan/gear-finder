import styled from "@emotion/styled";
import React from "react";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const CardActions: React.FunctionComponent = ({ children }) => {
  return <Container>{children}</Container>;
};

export default CardActions;
