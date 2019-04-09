import React, { useContext } from "react";
import styled from "@emotion/styled";

import Description from "./description";
import Mods from "./mods";
import { PoeItem, ItemModSearch } from "../../../poe-content";

export interface ItemInfoProps {
  item: PoeItem;
  onClick: (mod: ItemModSearch) => void;
}

const Container = styled.div`
  background: gray;
  grid-row: 1;
  display: grid;
  grid-template-columns: 1fr 5fr;
`;

const ItemInfo = ({ item, onClick }: ItemInfoProps) => {
  return (
    <Container>
      <Description {...item} item={item} />
      <Mods {...item} onClick={onClick} />
    </Container>
  );
};

export default ItemInfo;
