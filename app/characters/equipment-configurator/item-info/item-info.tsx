import React from "react";
import styled from "@emotion/styled";

import Description from "./description";
import Mods from "./mods";
import { PoeItem } from "../../../poe-content";

export interface ItemInfoProps {
  item: PoeItem;
}

const Container = styled.div`
  background: gray;
  grid-row: 1;
  display: grid;
  grid-template-columns: 1fr 5fr;
`;

const ItemInfo = ({ item }: ItemInfoProps) => (
  <Container>
    <Description {...item} item={item} />
    <Mods {...item} onClick={(mod: any) => console.log(mod)} />
  </Container>
);

export default ItemInfo;
