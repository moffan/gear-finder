import fetch from "node-fetch";

const ninjaUrl = (dataSource: string, league: string, type: string) =>
  `https://poe.ninja/api/data/${dataSource}?league=${league}&type=${type}`;

export const getItemData = (
  league: string = "Metamorph",
  type: string = "Currency"
) => {
  const url = ninjaUrl("itemoverview", league, type);

  return fetch(url).then(result => {
    if (result.ok) {
      return result.json();
    }

    // tslint:disable-next-line: no-console
    console.log(result);
    return null;
  });
};
