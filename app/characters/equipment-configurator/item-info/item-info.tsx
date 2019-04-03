import React from "react";
import styled from "@emotion/styled";

import Description from "./description";
import Mods from "./mods";
import { PoeItem } from "../../../poe-content";

export interface ItemInfoProps {
  item: PoeItem;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
`;

const DescriptionContainer = styled.div`
  grid-column: 1;
`;

const ModsContainer = styled.div`
  grid-column: 2;
`;

const ItemInfo = ({ item }: ItemInfoProps) => (
  <Container>
    <DescriptionContainer>
      <Description {...item} item={item} />
    </DescriptionContainer>
    <ModsContainer>
      <Mods {...item} onClick={(mod: any) => console.log(mod)} />
    </ModsContainer>
  </Container>
);

export default ItemInfo;
