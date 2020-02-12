import styled from "@emotion/styled";
import React, { FunctionComponent, useMemo, useState } from "react";

import { Input, Span, Ul } from "./base";
import { DownArrow, UpArrow } from "./icons";
import { ScrollViewer } from "./layout";

export const ComboBox: FunctionComponent<{
  options: any[];
  onSelect: any;
  defultValue?: string;
}> = ({ options, defultValue, onSelect }) => {
  const [filter, setFilter] = useState<string>(defultValue ?? "");
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const selector = (item: any): boolean =>
    filter ? item.text.toLowerCase().indexOf(filter.toLowerCase()) >= 0 : true;

  const items = useMemo(() => {
    const filteredItems = options?.filter(selector);
    return filteredItems;
  }, [filter]);

  const onItemSelected = (item: any): void => {
    setFilter(item.text);
    onSelect(item);
    setShowDropDown(false);
  };

  return (
    <Container>
      <SelectionContainer>
        <Input
          value={filter}
          onChange={(e): void => {
            setFilter(e.target.value);
            setShowDropDown(!!e.target.value);
          }}
        />
        {showDropDown ? (
          <UpArrow
            size={12}
            style={{ cursor: "pointer" }}
            onClick={(): void => setShowDropDown(!showDropDown)}
          />
        ) : (
          <DownArrow
            size={12}
            style={{ cursor: "pointer" }}
            onClick={(): void => setShowDropDown(!showDropDown)}
          />
        )}
      </SelectionContainer>

      <ScrollViewer>
        {showDropDown && (
          <Ul>
            {items.map((item, index) => (
              <Li key={index} onClick={(): void => onItemSelected(item)}>
                <Span style={{ backgroundColor: "darkgray" }}>{item.type}</Span>
                <Span>{item.text}</Span>
              </Li>
            ))}
          </Ul>
        )}
      </ScrollViewer>
    </Container>
  );
};

const Li = styled.li`
  cursor: pointer;
  list-style-type: none;
  &:hover {
    color: blue;
    background-color: gray;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: bisque;
  overflow: auto;
  margin: 0ren;
`;

const SelectionContainer = styled.div`
  display: flex;
  background-color: orange;
  flex-direction: row;
  flex: 1;
  align-items: center;
  padding: 0.1rem;
`;
