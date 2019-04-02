import React from "react";

import ItemSlot from "./item-slot";
import { PoeItem } from "../../common/poe.models";

const FlaskSlots = ({
  flasks,
  onClick
}: {
  flasks: PoeItem[];
  onClick: (item: PoeItem) => void;
}) => (
  <div style={{ display: "flex" }}>
    {flasks
      ? flasks.map((flask, index) => (
          <ItemSlot onClick={onClick} key={index} item={flask} />
        ))
      : null}
  </div>
);

export default FlaskSlots;