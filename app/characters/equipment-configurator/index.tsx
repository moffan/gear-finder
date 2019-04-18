import React, { Dispatch } from "react";
import styled from "@emotion/styled";

import ItemInfo from "./item-info/item-info";
import ItemFilter from "./item-filter";
import { PoeItem, ItemModSearch } from "../../poe-content";
import { ItemSearchAction, ItemSearchActionTypes } from "../character.models";

interface EquipmentConfiguratorProps {
  item?: PoeItem;
  filters: ItemModSearch[];
  dispatch: Dispatch<ItemSearchAction>;
}

const Container = styled.div`
  background: rgba(0, 0, 0, 0.14);
  grid-column: 2;
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const EquipmentConfigurator: React.FunctionComponent<
  EquipmentConfiguratorProps
> = ({ item, filters, dispatch }) => {
  if (!item) {
    return null;
  }


  return (
    <Container>
      <ItemInfo
        item={item}
        onClick={(payload: ItemModSearch) =>
          dispatch({
            type: ItemSearchActionTypes.Add,
            payload
          })
        }
      />
      <ItemFilter
        filters={filters}
        onChange={payload =>
          dispatch({
            type: ItemSearchActionTypes.Change,
            payload
          })
        }
        onRemove={payload =>
          dispatch({
            type: ItemSearchActionTypes.Remove,
            payload
          })
        }
      />
    </Container>
  );
};

export default EquipmentConfigurator;
