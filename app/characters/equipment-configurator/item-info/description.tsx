import React from "react";

const Category = ({ categories }) => (
  <div>
    {Object.keys(categories).map((category, index) => (
      <div key={index}>{category}</div>
    ))}
  </div>
);

const Description = ({ icon, name, typeLine, category, item }) => (
  <div>
    <picture onClick={() => console.log(item)}>
      <img src={icon} />
    </picture>
    {name && <span>{name}</span>}
    <div>{typeLine}</div>
    <Category categories={category} />
    <div>flavor text here ?</div>
  </div>
);

export default Description;
