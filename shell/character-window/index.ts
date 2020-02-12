/* eslint-disable no-fallthrough */
import { ipcMain } from "electron";

import { IpcEvent, IpcRequest, Poe, PoeRequests } from "../../common";
import { CharacterWindowApi } from "./character-window.api";

const api = new CharacterWindowApi();

const PoeRequestsStashTabHaneler = (
  { sender }: IpcEvent,
  {
    payload,
    onError,
    onSuccess
  }: IpcRequest<{
    poesessid: string;
    accountName: string;
    league: string;
    tabs: number[];
  }>
) => {
  if (!payload) {
    return sender.send(
      onError,
      "payload with accountName and poesessid must be provided"
    );
  }

  const { accountName, poesessid, league, tabs } = payload;
  if (!accountName || !poesessid) {
    return sender.send(onError, "accountName and poesessid must be provided");
  }

  api
    .getStashItems(poesessid, accountName, "pc", league, 1, tabs)
    .then(data => sender.send(onSuccess, data))
    .catch(error => sender.send(onError, error));
};

const PoeRequestsStashTabsHandler = (
  { sender }: IpcEvent,
  {
    payload,
    onError,
    onSuccess
  }: IpcRequest<{ poesessid: string; accountName: string; league: string }>
) => {
  const { accountName, poesessid, league } = payload;

  api
    .getStashTabs(poesessid, accountName, "pc", league)
    .then(tabs => {
      sender.send(
        onSuccess,
        tabs.tabs.map(({ n, type, id, i }) => ({ name: n, type, id, i }))
      );
    })
    .catch(error => sender.send(onError, error));
};

const PoeRequestsCharacterListHandler = (
  { sender }: IpcEvent,
  { payload, onError, onSuccess }: IpcRequest<any>
) => {
  const { poesessid, league } = payload;
  api
    .getCharacterList(poesessid)
    .then(characterList =>
      sender.send(
        onSuccess,
        characterList.filter(character => character.league === league)
      )
    )
    .catch(error => sender.send(onError, error));
};

const PoeRequestsCharacterHandler = (
  { sender }: IpcEvent,
  {
    payload,
    onError,
    onSuccess
  }: IpcRequest<{ name: string; accountName: string; poesessid: string }>
) => {
  const { name, accountName, poesessid } = payload;

  api
    .getCharacter(poesessid, accountName, name)
    .then(({ character, ...rest }) => {
      const items: Poe.CharacterEquipment = {};

      rest.items.forEach(item => {
        switch (item.inventoryId) {
          case "Flask":
            {
              const flasks = (items[item.inventoryId] as Poe.Item[]) ?? [];
              flasks.push(item);
              items[item.inventoryId] = flasks;
            }
            break;
          case Poe.EquipmentSlotType.Amulet:
          case Poe.EquipmentSlotType.Belt:
          case Poe.EquipmentSlotType.BodyArmour:
          case Poe.EquipmentSlotType.Boots:
          case Poe.EquipmentSlotType.Gloves:
          case Poe.EquipmentSlotType.Helm:
          // case Poe.EquipmentSlotType.MainInventory:
          case Poe.EquipmentSlotType.Offhand:
          case Poe.EquipmentSlotType.Offhand2:
          case Poe.EquipmentSlotType.Ring:
          case Poe.EquipmentSlotType.Ring2:
          case Poe.EquipmentSlotType.Weapon:
          case Poe.EquipmentSlotType.Weapon2:
            items[item.inventoryId] = item;
            break;
        }
      });

      sender.send(onSuccess, { character, items });
    })
    .catch(error => sender.send(onError, error));
};

ipcMain.on(PoeRequests.StashTab, PoeRequestsStashTabHaneler);
ipcMain.on(PoeRequests.StashTabs, PoeRequestsStashTabsHandler);
ipcMain.on(PoeRequests.CharacterList, PoeRequestsCharacterListHandler);
ipcMain.on(PoeRequests.Character, PoeRequestsCharacterHandler);
