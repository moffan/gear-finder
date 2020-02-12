import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";

import Description from "./description";
import Mods from "./mods";
import { Poe } from "../../../../common";

export interface ItemInfoProps {
  item?: Poe.Item;
  onClick: (mod: Poe.ItemModSearch) => void;
}

const Container = styled.div`
  background: gray;
  grid-row: 1;
  display: grid;
  grid-template-columns: 1fr 5fr;
`;

const ItemInfo: FunctionComponent<ItemInfoProps> = ({ item, onClick }) => {
  if (!item) {
    return <Container></Container>;
  }

  return (
    <Container>
      <Description {...item} item={item} />
      <Mods {...item} onClick={onClick} />
    </Container>
  );
};

export default ItemInfo;
