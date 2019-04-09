import React, { useContext, useEffect } from "react";
import styled from "@emotion/styled";
import { PoeContext, ItemModSearch } from "../../../poe-content";

const Container = styled.div`
  grid-row: 2;
`;

interface ItemFilterProps {
  mods: ItemModSearch[];
}

const ItemFilter: React.FunctionComponent<ItemFilterProps> = ({ mods }) => {
  return (
    <Container>
      {mods.map((mod, index) => {
        console.log(mod);
        return <div key={index}>{mod.mod}</div>;
      })}
    </Container>
  );
};

export default ItemFilter;
