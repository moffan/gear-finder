import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import { PoeContext } from "../poe-content";
import { DropDown, IconButton } from ".";

const Toolbar = styled.div`
  display: flex;
  align-items: center;
`;

const AppToolBar: React.FunctionComponent = () => {
  const { availableLeagues, selectedLeague, setSelectedLeague } = useContext(
    PoeContext
  );

  return (
    <Toolbar>
      <Link to="/">
        <IconButton icon="home">Home</IconButton>
      </Link>
      <DropDown
        selectedValue={selectedLeague}
        onChange={event => setSelectedLeague(event.target.value)}
        options={availableLeagues.map(({ text: label, id: value }) => ({
          label,
          value
        }))}
      />
    </Toolbar>
  );
};

export default AppToolBar;
