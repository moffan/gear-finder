import styled from "@emotion/styled";
import React from "react";

interface CardHeaderProps {
  title: string;
  subheader: string;
}

const CardHeaderContainer = styled.div`
  color: red;
  user-select: none;
`;

const CardHeader: React.FunctionComponent<CardHeaderProps> = ({
  title,
  subheader
}) => {
  return (
    <CardHeaderContainer>
      <h1>{title}</h1>
      <h2>{subheader}</h2>
    </CardHeaderContainer>
  );
};

export default CardHeader;
