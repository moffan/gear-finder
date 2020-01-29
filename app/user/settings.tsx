import React, { FunctionComponent, useContext } from "react";
import {
  Caption,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  ScrollViewer,
  Checkbox
} from "../components";
import { UserContext } from "./user.context";

export const Settings: FunctionComponent = () => {
  return (
    <>
      <h1>Settings</h1>
      <ScrollViewer>
        <StashTabList />
      </ScrollViewer>
    </>
  );
};

const StashTabList: FunctionComponent = () => {
  const {
    stash: { stashTabs, includeTab }
  } = useContext(UserContext);

  return (
    <Table>
      <Caption>Stash tabs</Caption>
      <Thead>
        <Tr>
          <Th scope="col">Name</Th>
          <Th scope="col">Type</Th>
          <Th scope="col">Include</Th>
        </Tr>
      </Thead>
      <Tbody>
        {stashTabs?.map((tab, index) => (
          <Tr key={index}>
            <Td>{tab.name}</Td>
            <Td>{tab.type}</Td>
            <Td>
              <Checkbox
                onChange={isChecked => includeTab(tab, isChecked)}
                isChecked={tab.included || false}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
