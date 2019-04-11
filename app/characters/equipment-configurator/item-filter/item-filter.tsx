import React, { useState } from "react";
import styled from "@emotion/styled";
import { ItemModSearch } from "../../../poe-content";
import { IconButton } from "../../../components";

const Container = styled.div`
  grid-row: 2;
`;

const FilterLine = styled.div`
  display: grid;
  background-color: darkseagreen;
  grid-template-columns: 5fr 1fr 1fr;
  grid-column-gap: 1em;
`;

const ModInfo = styled.span`
  grid-column: 0;
`;

const MinValue = styled.input`
  grid-column: 2;
  max-width: 3em;
`;

interface ItemFilterProps {
  mods: ItemModSearch[];
  onChange: (modSearch: ItemModSearch) => void;
  onRemove: (modSearch: ItemModSearch) => void;
}

const ItemFilter: React.FunctionComponent<ItemFilterProps> = ({
  mods,
  onChange,
  onRemove
}) => {
  return (
    <Container>
      {mods.map((mod, index) => {
        const { text, value } = mod;
        return (
          <FilterLine key={index}>
            <ModInfo>{text}</ModInfo>
            <MinValue
              value={value}
              onChange={e => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) {
                  onChange({ ...mod, value });
                }
              }}
            />
            <IconButton icon="remove_circle" onClick={() => onRemove(mod)} />
          </FilterLine>
        );
      })}
    </Container>
  );
};

export default ItemFilter;
