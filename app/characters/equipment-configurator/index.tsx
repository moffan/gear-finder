import React from "react";
import styled from "@emotion/styled";

import ItemInfo from "./item-info/item-info";
import ItemFilter from "./item-filter/item-filter";
import { PoeItem } from "../../poe-content";

export interface EquipmentConfiguratorProps {
  item: PoeItem;
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

class EquipmentConfigurator extends React.Component<
  EquipmentConfiguratorProps
> {
  public render() {
    const { item } = this.props;

    return (
      <Container>
        <ItemInfo item={item} />
        <ItemFilter />
      </Container>
    );
  }
}

export default EquipmentConfigurator;
