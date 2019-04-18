import React, { Dispatch } from "react";
import styled from "@emotion/styled";

import ItemInfo from "./item-info/item-info";
import ItemFilter from "./item-filter";
import { PoeItem, ItemModSearch } from "../../poe-content";
import { ItemSearchAction, ItemSearchActionTypes } from "../character.models";
import { apiService } from "../../common";
import { PoeRequests } from "../../../common";

interface EquipmentConfiguratorProps {
  item?: PoeItem;
  filters: ItemModSearch[];
  dispatch: Dispatch<ItemSearchAction>;
}

const Container = styled.div`
  background: rgba(0, 0, 0, 0.14);
  grid-column: 2;
  display: grid;
  grid-template-rows: 10fr 10fr 1fr;
`;

const Tools = styled.div`
  background-color: #95d3ea;
  grid-row: 3;
`;

const EquipmentConfigurator: React.FunctionComponent<
  EquipmentConfiguratorProps
> = ({ item, filters, dispatch }) => {
  if (!item) {
    return null;
  }

  const itemSearch = (item: PoeItem, filters: ItemModSearch[]) => {
    apiService
      .send(PoeRequests.ItemSearch, { item, filters, league: "Synthesis" })
      .then(console.log)
      .catch(console.error);
  };

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
      <Tools>
        <button
          disabled={!item || filters.length === 0}
          onClick={() => itemSearch(item, filters)}
        >
          search
        </button>
      </Tools>
    </Container>
  );
};

export default EquipmentConfigurator;
