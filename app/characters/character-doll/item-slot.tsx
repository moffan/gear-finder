import React from "react";
import { PoeItem } from "../../poe-content";

const itemSlot = ({
  item,
  onClick
}: {
  item: PoeItem;
  onClick: (item: PoeItem) => void;
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
