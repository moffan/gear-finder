import React from "react";
import styled from "@emotion/styled";

import ItemInfo from "./item-info/item-info";
import { PoeItem } from "../../poe-content";

export interface EquipmentConfiguratorProps {
  item: PoeItem;
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const ItemInfoContainer = styled.div`
  background: gray;
  grid-row: 1;
`;

const ItemFilterContainer = styled.div`
  background-color: #dadee2;
  grid-row: 2;
`;

class EquipmentConfigurator extends React.Component<
  EquipmentConfiguratorProps
> {
  public render() {
    const { item } = this.props;

    return (
      <Container>
        <ItemInfoContainer>
          <ItemInfo item={item} />
        </ItemInfoContainer>
        <ItemFilterContainer>Item filter</ItemFilterContainer>
      </Container>
    );
  }
}

export default EquipmentConfigurator;
