import React, { Dispatch, useContext } from "react";
import styled from "@emotion/styled";

import ItemInfo from "./item-info/item-info";
import ItemFilter from "./item-filter";
import { ItemSearchAction, ItemSearchActionTypes } from "../character.models";
import { PoeRequests, Poe } from "../../../common";
import { UserContext } from "../../user";

interface EquipmentConfiguratorProps {
  item?: Poe.Item;
  filters: Poe.ItemModSearch[];
  dispatch: Dispatch<ItemSearchAction>;
}

const Container = styled.div`
  background: rgba(0, 0, 0, 0.14);
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-basis: 0;
`;

const Content = styled.div`
  flex: 1;
`;

const Tools = styled.div`
  background-color: #95d3ea;
  grid-row: 3;
`;

const EquipmentConfigurator: React.FunctionComponent<EquipmentConfiguratorProps> = ({
  item,
  filters,
  dispatch
}) => {
  const { api } = useContext(UserContext);

  const itemSearch = (item: Poe.Item, filters: Poe.ItemModSearch[]) => {
    api
      .send(PoeRequests.ItemSearch, { item, filters, league: "Synthesis" })
      .then(console.log)
      .catch(console.error);
  };

  return (
    <Container>
      <Content>
        <ItemInfo
          item={item}
          onClick={(payload: Poe.ItemModSearch) =>
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
      </Content>
      <Tools>
        <button
          disabled={!item || filters.length === 0}
          onClick={() => item && itemSearch(item, filters)}
        >
          search
        </button>
      </Tools>
    </Container>
  );
};

export default EquipmentConfigurator;
