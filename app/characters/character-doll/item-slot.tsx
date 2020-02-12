import React from "react";
import { Poe } from "../../../common";

const itemSlot = ({
  item,
  onClick
}: {
  item?: Poe.Item;
  onClick: (item: Poe.Item) => void;
}) => {
  if (item) {
    return (
      <div
        onClick={() => onClick(item)}
        style={{ cursor: "pointer" }}
        title={item.name ? `${item.name} - ${item.typeLine}` : item.typeLine}
      >
        <picture>
          <img src={item.icon} />
        </picture>
      </div>
    );
  } else {
    return null;
  }
};

export default itemSlot;
