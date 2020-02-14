import React, { FunctionComponent } from "react";

import { Cell, Columns, H1, Li, Ul } from "../components";
import { SearchFilter } from "./search-filter";

export const Search: FunctionComponent = () => {
  return (
    <>
      <H1>search</H1>
      <Columns>
        <Cell>
          <SearchFilter onSearch={item => console.log(item)} />
        </Cell>
        {/* <Cell /> */}
        <Cell>
          <H1>saved searches</H1>
          <Ul>
            <Li>Saved search filter</Li>
          </Ul>
        </Cell>
      </Columns>
    </>
  );
};
