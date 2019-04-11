import styled from "@emotion/styled";

export const Doll = styled.div`
  border: 5px black solid;
  padding: 5px;
  grid-column: 1;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
`;

export const Amulet = styled.div`
  grid-column: 4;
  grid-row: 2;
  border: 1px solid;
`;

export const Belt = styled.div`
  grid-column: 3;
  grid-row: 4;
  border: 1px solid;
`;

export const BodyArmour = styled.div`
  grid-column: 3;
  grid-row: 2 / 4;
  border: 1px solid;
`;

export const Boots = styled.div`
  grid-column: 4;
  grid-row: 4 / 5;
  border: 1px solid;
`;

export const Flasks = styled.div`
  grid-column: 1 / 6;
  grid-row: 5;
  border: 1px solid;
`;

export const Gloves = styled.div`
  grid-column: 2;
  grid-row: 4 / 5;
  border: 1px solid;
`;

export const Helm = styled.div`
  grid-column: 3;
  grid-row: 1;
  border: 1px solid;
`;

export const Ring1 = styled.div`
  grid-column: 2;
  grid-row: 3;
  border: 1px solid;
`;

export const Ring2 = styled.div`
  grid-column: 4;
  grid-row: 3;
  border: 1px solid;
`;

export const WeaponSlot1 = styled.div`
  grid-column: 1;
  grid-row: 1 / 5;
  border: 1px solid;
`;

export const WeaponSlot2 = styled.div`
  grid-column: 5;
  grid-row: 1 / 5;
  border: 1px solid;
`;
