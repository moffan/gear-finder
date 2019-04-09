import React, { useReducer, useEffect } from "react";
import styled from "@emotion/styled";

import ItemInfo from "./item-info/item-info";
import ItemFilter from "./item-filter/item-filter";
import { PoeItem, ItemModSearch } from "../../poe-content";

export interface EquipmentConfiguratorProps {
  item: PoeItem;
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const EquipmentConfigurator: React.FunctionComponent<
  EquipmentConfiguratorProps
> = ({ item }) => {
  const [mods, dispatch] = useReducer((state: string[], action) => {
    const { type } = action;
    switch (type) {
      case "ADD":
        return state.indexOf(action.payload.mod) === -1
          ? [...state, action.payload]
          : state;
      case "CLEAR":
        return [];
      default:
        return state;
    }
  }, []);

  useEffect(() => {
    if (!!mods.length) {
      dispatch({ type: "CLEAR" });
    }
  }, [item]);

  return (
    <Container>
      <ItemInfo
        item={item}
        onClick={(payload: ItemModSearch) =>
          dispatch({
            type: "ADD",
            payload
          })
        }
      />
      <ItemFilter mods={mods} />
    </Container>
  );
};

export default EquipmentConfigurator;
