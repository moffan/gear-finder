import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../user";
import { PoeRequests, ItemStat, ItemModifiers } from "../../common";
import { useState } from "react";
import { DropDown } from "../components";

export const Search = () => {
  const { api } = useContext(UserContext);
  const [craftedModifiers, setCraftedModifiers] = useState<ItemStat[]>([]);
  const [delveModifiers, setDelveModifiers] = useState<ItemStat[]>([]);
  const [enchantModifiers, setEnchantModifiers] = useState<ItemStat[]>([]);
  const [explicitModifiers, setExplicitModifiers] = useState<ItemStat[]>([]);
  const [fracturedModifiers, setFracturedModifiers] = useState<ItemStat[]>([]);
  const [implicitModifiers, setImplicitModifiers] = useState<ItemStat[]>([]);
  const [monsterModifiers, setMonsterModifiers] = useState<ItemStat[]>([]);
  const [pseudoModifiers, setpSeudoModifiers] = useState<ItemStat[]>([]);
  const [veiledModifiers, setVeiledModifiers] = useState<ItemStat[]>([]);

  useEffect(() => {
    const getStats = async () => {
      const {
        crafted,
        delve,
        enchant,
        explicit,
        fractured,
        implicit,
        monster,
        pseudo,
        veiled
      } = await api.send<ItemModifiers>(PoeRequests.Stats);

      setCraftedModifiers(crafted);
      setDelveModifiers(delve);
      setEnchantModifiers(enchant);
      setExplicitModifiers(explicit);
      setFracturedModifiers(fractured);
      setImplicitModifiers(implicit);
      setMonsterModifiers(monster);
      setpSeudoModifiers(pseudo);
      setVeiledModifiers(veiled);
    };

    getStats();
  }, []);
  return (
    <>
      <h1>search</h1>
      <DropDown
        items={craftedModifiers}
        defultValue="#% to Fire and Cold Resistances"
        // tslint:disable-next-line: no-console
        onSelect={item => console.log(item)}
      />
    </>
  );
};
