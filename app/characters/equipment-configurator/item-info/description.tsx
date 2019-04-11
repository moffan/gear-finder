import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  grid-column: 1;
`;

const Category: React.FunctionComponent<{ categories: any }> = ({
  categories
}) => (
  <div>
    {Object.keys(categories).map((category, index) => (
      <div key={index}>{category}</div>
    ))}
  </div>
);

const ItemName = styled.h1``;
const TypeLine = styled.h2``;

const Description: React.FunctionComponent<{
  icon: any;
  name: any;
  typeLine: any;
  category: any;
  item: any;
}> = ({ icon, name, typeLine, category, item }) => (
  <Container>
    <picture onClick={() => console.log(item)}>
      <img src={icon} />
    </picture>
    {name && <ItemName>{name}</ItemName>}
    <TypeLine>{typeLine}</TypeLine>
    <Category categories={category} />
    <div>flavor text here ?</div>
  </Container>
);

export default Description;
